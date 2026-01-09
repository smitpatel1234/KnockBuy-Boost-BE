"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantCollectionIdSchema = exports.ItemVariantValueMappingSchema = exports.VarientPropWithCollectionSchema = exports.VarientWithValuesSchema = exports.AddVarientPropWithCollectionSchema = exports.ItemVariantValueMappingId = exports.VarientValuesID = exports.AddVarientWithValuesSchema = exports.VarientPropertysID = exports.VarientPropertysSchema = exports.AddVarientPropertysSchema = exports.PropertyNameField = void 0;
const zod_1 = require("zod");
const user_1 = require("../user");
exports.PropertyNameField = zod_1.z.string().max(40).min(1);
exports.AddVarientPropertysSchema = zod_1.z.object({
    property_name: exports.PropertyNameField,
});
exports.VarientPropertysSchema = zod_1.z.object({
    property_name: exports.PropertyNameField,
    variantProperty_id: user_1.IdField,
});
exports.VarientPropertysID = zod_1.z.object({
    variantProperty_id: user_1.IdField
});
exports.AddVarientWithValuesSchema = zod_1.z.object({
    variant_value: zod_1.z.string().max(100).min(1),
    variantProperty_id: user_1.IdField,
});
exports.VarientValuesID = zod_1.z.object({
    variantValue_id: user_1.IdField
});
exports.ItemVariantValueMappingId = zod_1.z.object({
    item_variantvalue_mapping_id: user_1.IdField,
});
exports.AddVarientPropWithCollectionSchema = zod_1.z.object({
    item_id: user_1.IdField,
    varient_item_Id: user_1.IdField,
});
exports.VarientWithValuesSchema = zod_1.z.object({
    variantProperty_id: user_1.IdField,
    variant_value: zod_1.z.string().max(100).min(1),
    variantValue_id: user_1.IdField,
});
exports.VarientPropWithCollectionSchema = zod_1.z.object({
    item_id: user_1.IdField,
    variantProperty_id: user_1.IdField,
    varient_collection_id: user_1.IdField,
});
exports.ItemVariantValueMappingSchema = zod_1.z.object({
    item_id: user_1.IdField,
    variantValue_id: user_1.IdField
});
exports.VariantCollectionIdSchema = zod_1.z.object({
    variant_collection_id: user_1.IdField
});
