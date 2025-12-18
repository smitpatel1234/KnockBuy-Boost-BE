import { IdField } from "../user";
import { z } from "zod";

export const PropertyNameField = z.string().max(40).min(1);
export const AddVarientPropertysSchema = z.object({
    property_name: PropertyNameField,
});

export const VarientPropertysSchema = z.object({
    variantProperty_id: IdField,
    property_name: PropertyNameField,
});

export const AddVarientWithValuesSchema = z.object({
    variant_value: z.string().max(100).min(1),
    variant_id: IdField,
});
export const AddVarientPropWithCollectionSchema = z.object({
    item_id: IdField,
    varient_item_Id: IdField,
});


export const VarientWithValuesSchema = z.object({
    varientValue_id: IdField,
    varient_value: z.string().max(100).min(1),
    varient_id: IdField,
});
export const VarientPropWithCollectionSchema = z.object({
    varient_collection_id: IdField,
    item_id: IdField,
    varient_item_Id: IdField,
});

