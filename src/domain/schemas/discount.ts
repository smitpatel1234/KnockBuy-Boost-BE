import { z } from "zod";

export const AddDiscountSchema = z.object({
    active_flag: z.union([z.literal(1), z.literal(0)]).optional(),
    description: z.string().optional(),
    discount_amount: z.number().min(1, "Discount amount must be positive"),
    discount_code: z.string().min(1, "Discount code is required"),
    discount_name: z.string().min(1, "Discount name is required"),
    discount_start_date: z.iso.date(),
    discount_type: z.enum(["percentage", "flat"]),
    duration: z.number().optional()
});

export const UpdateDiscountSchema = AddDiscountSchema.extend({
    discount_id: z.string(),
}).partial().required({ discount_id: true });

export const DiscountIdSchema = z.object({
    discount_id: z.string()
});

export const ValidatePromoSchema = z.object({
    code: z.string().min(1, "Promo code is required")
});
