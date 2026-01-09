import { z } from "zod";

import { IdField } from "../user";

export const PropertyNameField = z.string().max(40).min(1);
export const AddVarientPropertysSchema = z.object({
    property_name: PropertyNameField,
});

export const VarientPropertysSchema = z.object({
    property_name: PropertyNameField,
    variantProperty_id: IdField,
});
export const VarientPropertysID = z.object({
    variantProperty_id: IdField
})
export const AddVarientWithValuesSchema = z.object({
    variant_value: z.string().max(100).min(1),
    variantProperty_id: IdField,
});

export const VarientValuesID = z.object({
    variantValue_id: IdField
})
export const ItemVariantValueMappingId = z.object({
    item_variantvalue_mapping_id: IdField,

})

export const AddVarientPropWithCollectionSchema = z.object({
    item_id: IdField,
    varient_item_Id: IdField,
});


export const VarientWithValuesSchema = z.object({
    variantProperty_id: IdField,
    variant_value: z.string().max(100).min(1),
    variantValue_id: IdField,
});
export const VarientPropWithCollectionSchema = z.object({
    item_id: IdField,
    variantProperty_id: IdField,
    varient_collection_id: IdField,
});

export const ItemVariantValueMappingSchema = z.object({

    item_id: IdField,
    variantValue_id: IdField
})

export const VariantCollectionIdSchema = z.object({
    variant_collection_id: IdField
});

