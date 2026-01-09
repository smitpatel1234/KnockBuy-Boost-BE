import { ItemModel } from "./item.models";
export interface GetItemVariantValueMappingModel extends VariantValueModelWithvariantProperty {
  item_id: string;
  item_variantvalue_mapping_id: string;
}
export interface GetVariantCollectionModel {
  main_item: ItemModel;
  variant_collection_id: string;
  variant_item: ItemModel;
}
export interface ItemVariantValueMappingModel {
  item_id: string;
  item_variantvalue_mapping_id?: string;
  variantValue_id: string;
}
export interface VariantCollectionModel {
  item_id: string;
  variant_collection_id?: string;
  variant_item_id: string;
}

export interface VariantPropertyModel {
  property_name: string;
  variantProperty_id?: string;
}
export interface VariantValueModel {
  variant_value: string;
  variantProperty_id: string;
  variantValue_id?: string;
}

export interface VariantValueModelWithvariantProperty {
  Property_name: string;
  variant_value: string;
  variantProperty_id: string;
  variantValue_id?: string;
}
