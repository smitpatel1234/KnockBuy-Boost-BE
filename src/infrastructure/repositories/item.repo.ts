import { EntityManager } from "typeorm";
import { ItemRepoPort } from "../../application/port/item-repo.port";
import {
  pageParams,
  PaginationResponse,
  searchPageParams,
} from "../../domain/globalTypes/commonFields";
import {
  AddItemModel,
  GetItemModel,
  ItemModel,
  images as ImageType,
  VariantCollectionForOneItem,
} from "../../domain/models/item.models";
import {
  applyPaginationAndFilters,
  applySearchAndFilters,
} from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { Category } from "../orm/entities/category";
import { Item } from "../orm/entities/item";
import { Image } from "../orm/entities/image";
import { VariantRepo } from "./variant.repo";
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
    await VariantRepo.createVariantCollection(
      em,
      data.variant_collections,
      savedItem.item_id
    );
    await VariantRepo.mapItemToVariantValue(
      em,
      data.variant,
      savedItem.item_id
    );
    if (data.images && data.images.length > 0) {
      const imageRepo = em.getRepository("Image");
      const images = data.images.map((url) =>
        imageRepo.create({
          image_URL: url,
          item: savedItem,
        })
      );
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
      .getRawMany<GetItemModel>();
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
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select("image.image_URL")
          .from("image", "image")
          .where("image.items_id = item.item_id")
          .limit(1);
      }, "image_url");

    return await applyPaginationAndFilters<Item, GetItemModel>(
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
    return images.map((img) => img.image_URL);
  },

  getItemByIdOrSlug: async (
    em: EntityManager,
    id?: string,
    slug?: string
  ): Promise<GetItemModel | undefined> => {
    const item = em
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
        "item.slug AS slug",
      ]);
    if (id) item.where("item.item_id = :id", { id });
    if (slug) item.where("item.slug = :slug", { slug });
    if (!slug && !id) return undefined;

    const data = await item.getRawOne<GetItemModel>();
    return data;

  },

  searchItems: async (
    em: EntityManager,
    data: searchPageParams
  ): Promise<PaginationResponse<GetItemModel>> => {
    const queryBuilder = em
      .getRepository(Item)
      .createQueryBuilder("item")
      .leftJoin("item.category", "category")
      .leftJoin(
        "ItemVariantValueMapping",
        "mapping",
        "mapping.item_id = item.item_id"
      )
      .leftJoin("mapping.variantValue", "variantValue")
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
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select("image.image_URL")
          .from("image", "image")
          .where("image.items_id = item.item_id")
          .limit(1);
      }, "image_url")
      .distinct(true);

    return await applySearchAndFilters<Item, GetItemModel>(queryBuilder, data);
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
    existing.category = { category_id: data.category_id } as Category;
    await itemRepo.save(existing);
    await VariantRepo.deleteVariantCollection(em, existing.item_id);
    await VariantRepo.createVariantCollection(
      em,
      data.variant_collections,
      existing.item_id
    );
    await VariantRepo.deleteItemVariantMapping(em, existing.item_id);
    await VariantRepo.mapItemToVariantValue(em, data.variant, existing.item_id);
    if (data.images) {
      const imageRepo = em.getRepository(Image);
      await imageRepo.delete({ item: { item_id: data.item_id } });
      if (data.images.length > 0) {
        const images = data.images.map((url) =>
          imageRepo.create({
            image_URL: url,
            item: { item_id: data.item_id },
          })
        );
        await imageRepo.save(images);
      }
    }
    return true;
  },
  ISItemInStock: async (
    em: EntityManager,
    item_id: string,
    quantity: number
  ) => {
    const item = await em
      .getRepository(Item)
      .findOneOrFail({ where: { item_id: item_id } });
    return item.stock >= quantity;
  },
  wrapTransaction: wrapTransaction,
};
