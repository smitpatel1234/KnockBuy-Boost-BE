import { EntityManager } from "typeorm";
import { Item } from "../orm/entities/item";
import { Category } from "../orm/entities/category";
import { Image } from "../orm/entities/image";
import { ItemRepoPort } from "../../application/port/item-repo.port";
import {
  AddItemModel,
  ItemModel,
  GetItemModel,
} from "../../domain/models/item.models";
import { wrapTransaction } from "../helper/transaction";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
export const ItemRepo: ItemRepoPort = {
  GetAllItemsPage: async (
    em: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<GetItemModel>> => {
    const ItemBuilders = em
      .getRepository(Item)
      .createQueryBuilder("item")
      .leftJoin("item.category", "category")
      .select([
        "item.item_id AS item_id",
        "item.item_name AS item_name",
        "item.item_price AS item_price",
        "category.category_id AS category_id",
        "category.category_name AS category_name",
        "item.rating AS rating",
        "item.sku AS sku",
        "item.stock AS stock",
        "item.description AS description",
        "item.slug AS slug",
      ]).addSelect((subQuery) => {
        return subQuery
          .select("image.image_URL")
          .from("image", "image")
          .where("image.items_id = item.item_id")
          .limit(1);
      }, "image_url");

    return applyPaginationAndFilters<GetItemModel>(
      ItemBuilders,
      data
    );
  },
  getItemBySlug: async (
    em: EntityManager,
    slug: string
  ): Promise<ItemModel | null> => {
    const item = await em.getRepository(Item).findOne({
      where: { slug: slug },
    });

    return item as unknown as ItemModel;
  },

  getItemById: async (
    em: EntityManager,
    id: string
  ): Promise<ItemModel | null> => {
    const item = await em
      .getRepository(Item)
      .createQueryBuilder("item")
      .leftJoin("item.category", "category")
      .select([
        "item.item_id AS item_id",
        "item.item_name AS item_name",
        "item.item_price AS item_price",
        "item.description AS description",
        "item.rating AS rating",
        "item.sku AS sku",
        "item.stock AS stock",
        "category.category_id AS category_id",
        "category.category_name AS category_name",
      ])
      .where("item.item_id = :id", { id })
      .getRawOne();

    if (!item) return null;

    const related = await em
      .getRepository("VariantCollection")
      .createQueryBuilder("vc")
      .leftJoinAndSelect("vc.variant_item_id", "variant_item")
      .where("vc.item_id = :itemId", { itemId: id })
      .getMany();

    const result = {
      ...item,
      variant_collections: related.map((r: any) => r.variant_item_id?.item_id),
    };

    return result as unknown as ItemModel;
  },

  getImagesByItemId: async (
    em: EntityManager,
    id: string
  ): Promise<string[]> => {
    const images = await em
      .getRepository(Image)
      .createQueryBuilder("image")
      .where("image.item = :itemId", { itemId: id })
      .getMany();
    return images.map(img => img.image_URL);
  },

  CreateItem: async (
    em: EntityManager,
    data: AddItemModel
  ): Promise<boolean> => {
    const itemRepo = em.getRepository(Item);
    const newItem = itemRepo.create({
      item_name: data.item_name,
      item_price: data.item_price,
      description: data.description,
      rating: data.rating,
      sku: data.sku,
      stock: data.stock,
      category: { category_id: data.category_id },
    });

    const savedItem = await itemRepo.save(newItem);

    if (data.variant && data.variant.length > 0) {
      const mappingRepo = em.getRepository("ItemVariantValueMapping");
      const mappings = data.variant.map((v) =>
        mappingRepo.create({
          item: savedItem,
          variantValue: { variantValue_id: v.variantValue_id },
        })
      );
      await mappingRepo.save(mappings);
    }

    if (data.variant_collections && data.variant_collections.length > 0) {
      const vcRepo = em.getRepository("VariantCollection");
      const uniqueIds = Array.from(new Set(data.variant_collections)).filter(id => id !== (savedItem.item_id as unknown as string));
      const vcs = uniqueIds.map((vid) => vcRepo.create({
        item_id: savedItem,
        variant_item_id: { item_id: vid }
      }));
      if (vcs.length > 0) await vcRepo.save(vcs);
    }

    if (data.images && data.images.length > 0) {
      const imageRepo = em.getRepository("Image");
      const images = data.images.map(url => imageRepo.create({
        image_URL: url,
        item: savedItem
      }));
      await imageRepo.save(images);
    }

    return true;
  },

  UpdateItem: async (em: EntityManager, data: ItemModel): Promise<boolean> => {
    console.log("UpdateItem", data);
    const itemRepo = em.getRepository(Item);
    const existing = await itemRepo.findOneBy({ item_id: data.item_id });
    if (!existing) return false;

    existing.item_name = data.item_name;
    existing.item_price = data.item_price;
    existing.description = data.description;
    existing.rating = data.rating;
    existing.sku = data.sku;
    existing.stock = data.stock;
    existing.category = { ...existing.category, category_id: data.category_id };

    await itemRepo.save(existing);

    if (data.variant) {
      const mappingRepo = em.getRepository("ItemVariantValueMapping");
      await mappingRepo.delete({ item: { item_id: data.item_id } });

      const mappings = data.variant.map((v) =>
        mappingRepo.create({
          item: { item_id: data.item_id },
          variantValue: { variantValue_id: v.variantValue_id },
        })
      );
      await mappingRepo.save(mappings);
    }

    if (data.variant_collections) {
      const vcRepo = em.getRepository("VariantCollection");
      await vcRepo.delete({ item_id: { item_id: data.item_id } });
      const uniqueIds = Array.from(new Set(data.variant_collections)).filter(id => id !== data.item_id);
      const vcs = uniqueIds.map((vid) => vcRepo.create({
        item_id: { item_id: data.item_id } as Item,
        variant_item_id: { item_id: vid } as Item,
      }));
      if (vcs.length > 0) await vcRepo.save(vcs);
    }

    if (data.images) {
      const imageRepo = em.getRepository(Image);

      await imageRepo.delete({ item: { item_id: data.item_id } });

      if (data.images.length > 0) {
        const images = data.images.map(url => imageRepo.create({
          image_URL: url,
          item: { item_id: data.item_id } as Item
        }));
        await imageRepo.save(images);
      }
    }

    return true;
  },

  DeleteItem: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.getRepository(Item).delete(id);
    return (result.affected ?? 0) > 0;
  },

  GetAllItems: async (em: EntityManager): Promise<GetItemModel[]> => {
    const items = await em
      .getRepository(Item)
      .createQueryBuilder("item")
      .leftJoin("item.category", "category")
      .select([
        "item.item_id AS item_id",
        "item.slug AS slug",
        "item.item_name AS item_name",
        "item.item_price AS item_price",
        "category.category_id AS category_id",
        "category.category_name AS category_name",
        "item.rating AS rating",
        "item.sku AS sku",
        "item.stock AS stock",
        "item.description AS description",
      ])
      .getRawMany();
    return items;
  },
  wrapTransaction: wrapTransaction,
};
