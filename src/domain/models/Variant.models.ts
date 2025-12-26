

export interface VariantPropertyModel {
  variantProperty_id?: string;
  property_name: string;
}

export interface VariantValueModel {
  variantValue_id?: string;
  variant_value: string;
  variantProperty_id: string;
}

export interface ItemVariantValueMappingModel {
  item_variantvalue_mapping_id?: string;
  item_id: string;
  variantValue_id: string;
}

export interface VariantCollectionModel {
  variant_collection_id?: string;
  item_id: string;
  variant_item_id: string;
}
export interface VariantValueModelWithvariantProperty {
  variantValue_id?: string;
  variant_value: string;
  variantProperty_id: string;
  Property_name: string
}


export interface GetItemVariantValueMappingModel extends VariantValueModelWithvariantProperty {
  item_id: string;
  item_variantvalue_mapping_id: string;

}