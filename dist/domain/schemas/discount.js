"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountIdSchema = exports.UpdateDiscountSchema = exports.AddDiscountSchema = void 0;
const zod_1 = require("zod");
exports.AddDiscountSchema = zod_1.z.object({
    discount_name: zod_1.z.string().min(1, "Discount name is required"),
    discount_code: zod_1.z.string().min(1, "Discount code is required"),
    discount_type: zod_1.z.enum(["percentage", "flat"]),
    discount_amount: zod_1.z.number().min(1, "Discount amount must be positive"),
    duration: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    discount_start_date: zod_1.z.string().or(zod_1.z.date()).transform((val) => new Date(val)).optional(),
    active_flag: zod_1.z.boolean().optional().default(false),
});
exports.UpdateDiscountSchema = exports.AddDiscountSchema.extend({
    discount_id: zod_1.z.string().uuid(),
}).partial().required({ discount_id: true });
exports.DiscountIdSchema = zod_1.z.object({
    discount_id: zod_1.z.string().uuid()
});
