import { Category } from "../../infrastructure/orm/entities/category";

export interface AddItemModel {
  category?: Category;
  category_id?: string;
  description: string;
  images?: string[];
  item_name: string;
  item_price: number;
  rating?: number;
  sku?: string;
  stock: number;
  variant?: VariantForOneItem[];
  variant_collections?: VariantCollectionForOneItem[];
}
export interface ForGetItemVariantCollection {
  category?: Category;
  category_id?: string;
  category_name?: string;
  description: string;
  images?: images[];
  item_id: string;
  item_name: string;
  item_price: number;
  rating?: number;
  sku?: string;
  slug: string;
  stock: number;
  variant?: VariantForOneItem[];
  variant_collections?: VariantCollectionForOneItem[];
}
export interface GetItemModel extends AddItemModel {
  category_name: string;
  image_id?: string;
  image_url?: string;
  item_id: string;
  slug: string;
  variant_info?: { property: string; value: string }[];
}

export interface images {
  image_items_id: string;
  image_URL: string;
}

export interface ItemModel extends AddItemModel {
  category_name?: string;
  item_id: string;
  slug: string;
}

export interface VariantCollectionForOneItem {
  item_id: string;
  item_name: string;
}

export interface VariantForOneItem {
  variantProperty_id: string;
  variantValue_id: string;
}
