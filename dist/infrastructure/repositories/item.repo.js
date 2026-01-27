"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const image_1 = require("../orm/entities/image");
const item_1 = require("../orm/entities/item");
const variant_repo_1 = require("./variant.repo");
exports.ItemRepo = {
    CreateItem: async (em, data) => {
        const itemRepo = em.getRepository(item_1.Item);
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
        await variant_repo_1.VariantRepo.createVariantCollection(em, data.variant_collections, savedItem.item_id);
        await variant_repo_1.VariantRepo.mapItemToVariantValue(em, data.variant, savedItem.item_id);
        if (data.images && data.images.length > 0) {
            const imageRepo = em.getRepository("Image");
            const images = data.images.map((url) => imageRepo.create({
                image_URL: url,
                item: savedItem,
            }));
            await imageRepo.save(images);
        }
        return true;
    },
    DeleteItem: async (em, id) => {
        const result = await em.getRepository(item_1.Item).softDelete(id);
        return (result.affected ?? 0) > 0;
    },
    GetAllItems: async (em) => {
        const items = await em
            .getRepository(item_1.Item)
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
    GetAllItemsPage: async (em, data) => {
        const ItemBuilders = em
            .getRepository(item_1.Item)
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
        ]).groupBy('item.item_id')
            .addSelect((subQuery) => {
            return subQuery
                .select("image.image_URL")
                .from("image", "image")
                .where("image.items_id = item.item_id")
                .limit(1);
        }, "image_url");
        const CItemBuilders = em
            .getRepository(item_1.Item)
            .createQueryBuilder("item");
        return await (0, pagination_helper_1.applyPaginationAndFilters)(ItemBuilders, CItemBuilders, data, [
            "item.item_id",
            "item.item_name",
            "item.item_price",
            "category.category_id",
            "category.category_name",
            "item.rating",
            "item.sku",
            "item.stock",
            "item.description",
            "item.slug",
            "image_url",
            "item_name",
            "item_price",
            "rating",
            "sku",
            "stock",
            "description",
            "slug"
        ]);
    },
    getImagesByItemId: async (em, id) => {
        const images = await em
            .getRepository(image_1.Image)
            .createQueryBuilder("image")
            .where("image.item = :itemId", { itemId: id })
            .getMany();
        return images.map((img) => img.image_URL);
    },
    getItemByIdOrSlug: async (em, id, slug) => {
        const item = em
            .getRepository(item_1.Item)
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
        if (id)
            item.where("item.item_id = :id", { id });
        if (slug)
            item.where("item.slug = :slug", { slug });
        if (!slug && !id)
            return undefined;
        const data = await item.getRawOne();
        return data;
    },
    ISItemInStock: async (em, item_id, quantity) => {
        const item = await em
            .getRepository(item_1.Item)
            .findOneOrFail({ where: { item_id: item_id } });
        return item.stock >= quantity;
    },
    searchItems: async (em, data) => {
        const queryBuilder = em
            .getRepository(item_1.Item)
            .createQueryBuilder("item")
            .leftJoin("item.category", "category")
            .leftJoin("ItemVariantValueMapping", "mapping", "mapping.item_id = item.item_id")
            .leftJoin("mapping.variantValue", "variantValue")
            .leftJoin("variantValue.variantProperty", "variantProperty")
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
            "variantValue.variantValue_id AS variantValue_id",
            "variantValue.variant_value AS variant_value",
            "variantProperty.property_name AS property_name",
        ])
            .addSelect((subQuery) => {
            return subQuery
                .select("image.image_URL")
                .from("image", "image")
                .where("image.items_id = item.item_id")
                .limit(1);
        }, "image_url")
            .distinct(true);
        const CaqueryBuilder = em
            .getRepository(item_1.Item)
            .createQueryBuilder("item")
            .leftJoin("item.category", "category");
        return await (0, pagination_helper_1.applySearchAndFilters)(queryBuilder, CaqueryBuilder, data, [
            "item.item_id",
            "item.item_name",
            "item.item_price",
            "category.category_id",
            "category.category_name",
            "item.rating",
            "item.sku",
            "item.stock",
            "item.description",
            "item.slug",
            "image_url",
            "item_name",
            "item_price",
            "rating",
            "sku",
            "stock",
            "description",
            "slug",
            "variantValue.value"
        ]);
    },
    searchItemsByName: async (em, query) => {
        const items = await em
            .getRepository(item_1.Item)
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
            .where("item.item_name LIKE CONCAT('%', :query, '%')", { query })
            .orWhere("item.description LIKE CONCAT('%', :query, '%')", { query })
            .limit(5)
            .getRawMany();
        return items;
    },
    UpdateItem: async (em, data) => {
        const itemRepo = em.getRepository(item_1.Item);
        const existing = await itemRepo.findOneBy({ item_id: data.item_id });
        if (!existing)
            return false;
        existing.item_name = data.item_name;
        existing.item_price = data.item_price;
        existing.description = data.description;
        existing.rating = data.rating;
        existing.sku = data.sku;
        existing.stock = data.stock;
        existing.category = { category_id: data.category_id };
        await itemRepo.save(existing);
        await variant_repo_1.VariantRepo.deleteVariantCollection(em, existing.item_id);
        await variant_repo_1.VariantRepo.createVariantCollection(em, data.variant_collections, existing.item_id);
        await variant_repo_1.VariantRepo.deleteItemVariantMapping(em, existing.item_id);
        await variant_repo_1.VariantRepo.mapItemToVariantValue(em, data.variant, existing.item_id);
        if (data.images) {
            const imageRepo = em.getRepository(image_1.Image);
            await imageRepo.delete({ item: { item_id: data.item_id } });
            if (data.images.length > 0) {
                const images = data.images.map((url) => imageRepo.create({
                    image_URL: url,
                    item: { item_id: data.item_id },
                }));
                await imageRepo.save(images);
            }
        }
        return true;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
