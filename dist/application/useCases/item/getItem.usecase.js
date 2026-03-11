"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_item_by_slug = exports.get_item_by_id = void 0;
const get_item_by_id = async (em, id, itemRepo, variantRepo, descRepo, reviewRepo) => {
    const item = await itemRepo.getItemByIdOrSlug(em, id, undefined);
    if (!item)
        return null;
    const variant = await variantRepo.getItemVariantMappingForItem(em, id);
    const images = await itemRepo.getImagesByItemId(em, id);
    const varient_collection = await variantRepo.getItemVariantCollectionForItem(em, item.item_id);
    const richDescription = await descRepo.getDescriptionByItemId(em, item.item_id);
    const averageRating = await reviewRepo.calculateAverageRating(em, item.item_id);
    const data = {
        category_id: item.category_id,
        category_name: item.category_name,
        description: item.description,
        images: images,
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        rating: averageRating,
        rich_description: richDescription,
        sku: item.sku,
        slug: item.slug,
        stock: item.stock,
        variant: variant,
        variant_collections: varient_collection
    };
    return data;
};
exports.get_item_by_id = get_item_by_id;
const get_item_by_slug = async (em, slug, itemRepo, variantRepo, descRepo, reviewRepo) => {
    const item = await itemRepo.getItemByIdOrSlug(em, undefined, slug);
    if (!item)
        return null;
    const variant = await variantRepo.getItemVariantMappingForItem(em, item.item_id);
    const images = await itemRepo.getImagesByItemId(em, item.item_id);
    const varient_collection = await variantRepo.getItemVariantCollectionForItem(em, item.item_id);
    const richDescription = await descRepo.getDescriptionByItemId(em, item.item_id);
    const averageRating = await reviewRepo.calculateAverageRating(em, item.item_id);
    const data = {
        category_id: item.category_id,
        category_name: item.category_name,
        description: item.description,
        images: images,
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        rating: averageRating,
        rich_description: richDescription,
        sku: item.sku,
        slug: item.slug,
        stock: item.stock,
        variant: variant,
        variant_collections: varient_collection
    };
    return data;
};
exports.get_item_by_slug = get_item_by_slug;
