"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const item_1 = require("../orm/entities/item");
const transaction_1 = require("../helper/transaction");
exports.ItemRepo = {
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
            .leftJoin("item.category_id", "category")
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
        return item;
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
            category_id: data.category_id,
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
        existing.category_id = data.category_id;
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
            .leftJoin("item.category_id", "category")
            .select([
            "item.item_id AS item_id",
            "item.slug AS slug",
            "item.item_name AS item_name",
            "item.item_price AS item_price",
            "item.category_id AS category_id",
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
