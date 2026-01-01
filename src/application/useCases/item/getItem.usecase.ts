import { EntityManager } from "typeorm";
import { ItemRepoPort } from "../../port/item-repo.port";
import { ItemVariantValueMapping } from "../../../infrastructure/orm/entities/item_variantVlaue_mapping";
import { VariantRepoPort } from "../../port/variant-repo.port";
export const get_item_by_id = async (
  em: EntityManager,
  id: string,
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort
) => {
  const item = await itemRepo.getItemById(em, id);

  if (!item) return null;
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

export const get_item_by_slug = async (
  em: EntityManager,
  slug: string,
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort
) => {
  const item = await itemRepo.getItemBySlug(em, slug);

  if (!item) return null;
  const variant = await variantRepo.getItemVariantMappingForItem(
    em,
    item.item_id
  );
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
