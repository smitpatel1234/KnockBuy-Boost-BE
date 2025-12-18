import { UUID } from "crypto";


export interface VariantPropertyModel {
  variantProperty_id?: UUID;
  property_name: string;
}

export interface VariantValueModel {
  variantValue_id?: UUID;
  variant_value: string;
  variantProperty_id: UUID;
}

export interface ItemVariantValueMappingModel {
  item_variantvalue_mapping_id?: UUID;
  item_id: UUID;
  variantValue_id: UUID;
}

export interface VariantCollectionModel {
  variant_collection_id?: UUID;
  item_id: UUID;
  variant_item_id: UUID;
}
