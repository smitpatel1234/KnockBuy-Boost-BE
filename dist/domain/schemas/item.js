"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemIdSchema = exports.UpdateItemSchema = exports.AddItemSchema = void 0;
const zod_1 = require("zod");
exports.AddItemSchema = zod_1.z.object({
    item_name: zod_1.z.string().min(1, "Item name is required"),
    item_price: zod_1.z.number().min(0, "Price must be positive"),
    category_id: zod_1.z.string().uuid("Invalid Category ID"),
    rating: zod_1.z.number().min(0).max(5).optional(),
    sku: zod_1.z.string().optional(),
    stock: zod_1.z.number().int().min(0),
    description: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    variant: zod_1.z.array(zod_1.z.object({
        variantProperty_id: zod_1.z.string().uuid(),
        variantValue_id: zod_1.z.string().uuid()
    })).optional(),
    variant_collections: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.UpdateItemSchema = exports.AddItemSchema.extend({
    item_id: zod_1.z.string().uuid(),
}).partial().required({ item_id: true });
exports.ItemIdSchema = zod_1.z.object({
    item_id: zod_1.z.string().uuid()
});
