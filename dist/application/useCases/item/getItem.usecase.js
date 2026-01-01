"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_item_by_slug = exports.get_item_by_id = void 0;
const get_item_by_id = async (em, id, itemRepo, variantRepo) => {
    const item = await itemRepo.getItemById(em, id);
    if (!item)
        return null;
    const variant = await variantRepo.getItemVariantMappingForItem(em, id);
    const images = await itemRepo.getImagesByItemId(em, id);
    const data = {
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        category_id: item.category_id,
        category_name: item.category_name,
        rating: item.rating,
        sku: item.sku,
        stock: item.stock,
        description: item.description,
        slug: item.slug,
        variant_collections: item.variant_collections ?? [],
        variant: variant,
        images: images
    };
    return data;
};
exports.get_item_by_id = get_item_by_id;
const get_item_by_slug = async (em, slug, itemRepo, variantRepo) => {
    const item = await itemRepo.getItemBySlug(em, slug);
    if (!item)
        return null;
    const variant = await variantRepo.getItemVariantMappingForItem(em, item.item_id);
    const images = await itemRepo.getImagesByItemId(em, item.item_id);
    const data = {
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        category_id: item.category_id,
        category_name: item.category_name,
        rating: item.rating,
        sku: item.sku,
        stock: item.stock,
        description: item.description,
        slug: item.slug,
        variant_collections: item.variant_collections ?? [],
        variant: variant,
        images: images
    };
    return data;
};
exports.get_item_by_slug = get_item_by_slug;
