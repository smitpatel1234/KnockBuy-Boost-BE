"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientPropWithCollectionSchema = exports.VarientWithValuesSchema = exports.AddVarientPropWithCollectionSchema = exports.AddVarientWithValuesSchema = exports.VarientPropertysSchema = exports.AddVarientPropertysSchema = exports.PropertyNameField = void 0;
const user_1 = require("../user");
const zod_1 = require("zod");
exports.PropertyNameField = zod_1.z.string().max(40).min(1);
exports.AddVarientPropertysSchema = zod_1.z.object({
    property_name: exports.PropertyNameField,
});
exports.VarientPropertysSchema = zod_1.z.object({
    variantProperty_id: user_1.IdField,
    property_name: exports.PropertyNameField,
});
exports.AddVarientWithValuesSchema = zod_1.z.object({
    variant_value: zod_1.z.string().max(100).min(1),
    variant_id: user_1.IdField,
});
exports.AddVarientPropWithCollectionSchema = zod_1.z.object({
    item_id: user_1.IdField,
    varient_item_Id: user_1.IdField,
});
exports.VarientWithValuesSchema = zod_1.z.object({
    varientValue_id: user_1.IdField,
    varient_value: zod_1.z.string().max(100).min(1),
    varient_id: user_1.IdField,
});
exports.VarientPropWithCollectionSchema = zod_1.z.object({
    varient_collection_id: user_1.IdField,
    item_id: user_1.IdField,
    varient_item_Id: user_1.IdField,
});
