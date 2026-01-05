import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../application/port/item-repo.port";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import {
  AddItemModel,
  GetItemModel,
  ItemModel,
} from "../../domain/models/item.models";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { Category } from "../orm/entities/category";
import { Image } from "../orm/entities/image";
import { Item } from "../orm/entities/item";
export const ItemRepo: ItemRepoPort = {
  CreateItem: async (
    em: EntityManager,
    data: AddItemModel
  ): Promise<boolean> => {
    const itemRepo = em.getRepository(Item);
    const newItem = itemRepo.create({
      category: { category_id: data.category_id },
      description: data.description,
      item_name: data.item_name,
      item_price: data.item_price,
      rating: data.rating,
      sku: data.sku,
      stock: data.stock,
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
      const vcs = data.variant_collections.map((vid) => vcRepo.create({
        main_item: { item_id: savedItem.item_id },
        variant_item: { item_id: vid.item_id },
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
  DeleteItem: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.getRepository(Item).softDelete(id);
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
      .leftJoin("vc.variant_item", "variant_item")
      .select([
        "variant_item.item_id AS item_id",
        "variant_item.item_name AS item_name",
      ])
      .where("vc.main_item = :itemId", { itemId: id })
      .getRawMany();

    const result = {
      ...item,
      variant_collections: related,
    };

    return result as unknown as ItemModel;
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

  UpdateItem: async (em: EntityManager, data: ItemModel): Promise<boolean> => {
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
      await vcRepo.delete({ main_item: { item_id: data.item_id } });
      const vcs = data.variant_collections.map((vid) => vcRepo.create({
        main_item: { item_id: data.item_id },
        variant_item: { item_id: vid.item_id },
      }));
      if (vcs.length > 0) await vcRepo.save(vcs);
    }

    if (data.images) {
      const imageRepo = em.getRepository(Image);

      await imageRepo.delete({ item: { item_id: data.item_id } });

      if (data.images.length > 0) {
        const images = data.images.map(url => imageRepo.create({
          image_URL: url,
          item: { item_id: data.item_id }
        }));
        await imageRepo.save(images);
      }
    }

    return true;
  },
  wrapTransaction: wrapTransaction,
};
