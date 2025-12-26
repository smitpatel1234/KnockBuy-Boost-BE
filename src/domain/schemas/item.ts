import { z } from "zod";

export const AddItemSchema = z.object({
    item_name: z.string().min(1, "Item name is required"),
    item_price: z.number().min(0, "Price must be positive"),
    category_id: z.string().uuid("Invalid Category ID"),
    rating: z.number().min(0).max(5).optional(),
    sku: z.string().optional(),
    stock: z.number().int().min(0),
    description: z.string(),
    variant: z.array(z.object({
        variantProperty_id: z.string().uuid(),
        variantValue_id: z.string().uuid()
    })).optional(),
    variant_collections: z.array(z.string()).optional(),
});

export const UpdateItemSchema = AddItemSchema.extend({
    item_id: z.string().uuid(),
}).partial().required({ item_id: true });

export const ItemIdSchema = z.object({
    item_id: z.string().uuid()
});
