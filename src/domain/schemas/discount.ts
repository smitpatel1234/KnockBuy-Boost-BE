import { z } from "zod";

export const AddDiscountSchema = z.object({
    discount_name: z.string().min(1, "Discount name is required"),
    discount_code: z.string().min(1, "Discount code is required"),
    discount_type: z.enum(["percentage", "flat"]),
    discount_amount: z.number().min(1, "Discount amount must be positive"),
    duration: z.string().optional(),
    description: z.string().optional(),
    discount_start_date: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
    active_flag: z.boolean().optional().default(false),
});

export const UpdateDiscountSchema = AddDiscountSchema.extend({
    discount_id: z.string().uuid(),
}).partial().required({ discount_id: true });

export const DiscountIdSchema = z.object({
    discount_id: z.string().uuid()
});
