"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const item_1 = require("../orm/entities/item");
const image_1 = require("../orm/entities/image");
const transaction_1 = require("../helper/transaction");
const pagination_helper_1 = require("../helper/pagination.helper");
exports.ItemRepo = {
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
        ]).addSelect((subQuery) => {
            return subQuery
                .select("image.image_URL")
                .from("image", "image")
                .where("image.items_id = item.item_id")
                .limit(1);
        }, "image_url");
        return (0, pagination_helper_1.applyPaginationAndFilters)(ItemBuilders, data);
    },
    getItemBySlug: async (em, slug) => {
        const item = await em.getRepository(item_1.Item).findOne({
            where: { slug: slug },
        });
        return item;
    },
    getItemById: async (em, id) => {
        const item = await em
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
        ])
            .where("item.item_id = :id", { id })
            .getRawOne();
        if (!item)
            return null;
        const related = await em
            .getRepository("VariantCollection")
            .createQueryBuilder("vc")
            .leftJoinAndSelect("vc.variant_item_id", "variant_item")
            .where("vc.item_id = :itemId", { itemId: id })
            .getMany();
        const result = {
            ...item,
            variant_collections: related.map((r) => r.variant_item_id?.item_id),
        };
        return result;
    },
    getImagesByItemId: async (em, id) => {
        const images = await em
            .getRepository(image_1.Image)
            .createQueryBuilder("image")
            .where("image.item = :itemId", { itemId: id })
            .getMany();
        return images.map(img => img.image_URL);
    },
    CreateItem: async (em, data) => {
        const itemRepo = em.getRepository(item_1.Item);
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
            const mappings = data.variant.map((v) => mappingRepo.create({
                item: savedItem,
                variantValue: { variantValue_id: v.variantValue_id },
            }));
            await mappingRepo.save(mappings);
        }
        if (data.variant_collections && data.variant_collections.length > 0) {
            const vcRepo = em.getRepository("VariantCollection");
            const uniqueIds = Array.from(new Set(data.variant_collections)).filter(id => id !== savedItem.item_id);
            const vcs = uniqueIds.map((vid) => vcRepo.create({
                item_id: savedItem,
                variant_item_id: { item_id: vid }
            }));
            if (vcs.length > 0)
                await vcRepo.save(vcs);
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
    UpdateItem: async (em, data) => {
        console.log("UpdateItem", data);
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
        existing.category = { ...existing.category, category_id: data.category_id };
        await itemRepo.save(existing);
        if (data.variant) {
            const mappingRepo = em.getRepository("ItemVariantValueMapping");
            await mappingRepo.delete({ item: { item_id: data.item_id } });
            const mappings = data.variant.map((v) => mappingRepo.create({
                item: { item_id: data.item_id },
                variantValue: { variantValue_id: v.variantValue_id },
            }));
            await mappingRepo.save(mappings);
        }
        if (data.variant_collections) {
            const vcRepo = em.getRepository("VariantCollection");
            await vcRepo.delete({ item_id: { item_id: data.item_id } });
            const uniqueIds = Array.from(new Set(data.variant_collections)).filter(id => id !== data.item_id);
            const vcs = uniqueIds.map((vid) => vcRepo.create({
                item_id: { item_id: data.item_id },
                variant_item_id: { item_id: vid },
            }));
            if (vcs.length > 0)
                await vcRepo.save(vcs);
        }
        if (data.images) {
            const imageRepo = em.getRepository(image_1.Image);
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
    DeleteItem: async (em, id) => {
        const result = await em.getRepository(item_1.Item).delete(id);
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
    wrapTransaction: transaction_1.wrapTransaction,
};
