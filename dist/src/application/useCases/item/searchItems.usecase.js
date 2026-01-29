"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search_items = void 0;
const search_items = async (em, data, itemRepo) => {
    const result = await itemRepo.searchItems(em, data);
    const itemsMap = new Map();
    result.data.forEach((row) => {
        if (row.item_id && !itemsMap.has(row.item_id)) {
            itemsMap.set(row.item_id, {
                category_id: row.category_id,
                category_name: row.category_name,
                description: row.description,
                image_url: row.image_url,
                item_id: row.item_id,
                item_name: row.item_name,
                item_price: row.item_price,
                rating: row.rating,
                sku: row.sku,
                slug: row.slug,
                stock: row.stock,
                variant: []
            });
        }
    });
    return {
        ...result,
        data: Array.from(itemsMap.values())
    };
};
exports.search_items = search_items;
