import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../port/item-repo.port";
import { VariantRepoPort } from "../../port/variant-repo.port";
export const get_item_by_id = async (
  em: EntityManager,
  id: string,
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort
) => {
  const item = await itemRepo.getItemByIdOrSlug(em, id,undefined);
   
  if (!item) return null;
  const variant = await variantRepo.getItemVariantMappingForItem(em, id);
  const images = await itemRepo.getImagesByItemId(em, id);
  const varient_collection = await variantRepo.getItemVariantCollectionForItem(em, item.item_id);
  const data = {
    category_id: item.category_id,
    category_name: item.category_name,
    description: item.description,
    images: images,
    item_id: item.item_id,
    item_name: item.item_name,
    item_price: item.item_price,
    rating: item.rating,
    sku: item.sku,
    slug: item.slug,
    stock: item.stock,
    variant: variant,
    variant_collections: varient_collection ?? []
  };
  return data;
};

export const get_item_by_slug = async (
  em: EntityManager,
  slug: string,
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort
) => {
  
  const item = await itemRepo.getItemByIdOrSlug(em,undefined,slug);

  if (!item) return null;
  const variant = await variantRepo.getItemVariantMappingForItem(
    em,
    item.item_id
  );
  const images = await itemRepo.getImagesByItemId(em, item.item_id);
  const varient_collection = await variantRepo.getItemVariantCollectionForItem(em, item.item_id);

  const data = {
    category_id: item.category_id,
    category_name: item.category_name,
    description: item.description,
    images: images,
    item_id: item.item_id,
    item_name: item.item_name,
    item_price: item.item_price,
    rating: item.rating,
    sku: item.sku,
    slug: item.slug,
    stock: item.stock,
    variant: variant,
    variant_collections: varient_collection ??  []
  };
  return data;
};
