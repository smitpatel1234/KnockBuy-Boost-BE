"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePromoSchema = exports.DiscountIdSchema = exports.UpdateDiscountSchema = exports.AddDiscountSchema = void 0;
const zod_1 = require("zod");
exports.AddDiscountSchema = zod_1.z.object({
    active_flag: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(0)]).optional(),
    description: zod_1.z.string().optional(),
    discount_amount: zod_1.z.number().min(1, "Discount amount must be positive"),
    discount_code: zod_1.z.string().min(1, "Discount code is required"),
    discount_name: zod_1.z.string().min(1, "Discount name is required"),
    discount_start_date: zod_1.z.iso.date(),
    discount_type: zod_1.z.enum(["percentage", "flat"]),
    duration: zod_1.z.number().optional()
});
exports.UpdateDiscountSchema = exports.AddDiscountSchema.extend({
    discount_id: zod_1.z.string(),
}).partial().required({ discount_id: true });
exports.DiscountIdSchema = zod_1.z.object({
    discount_id: zod_1.z.string()
});
exports.ValidatePromoSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, "Promo code is required")
});
