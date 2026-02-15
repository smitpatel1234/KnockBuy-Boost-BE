import { z } from "zod";

export const AddItemSchema = z.object({
    category_id: z.string(),
    description: z.string(),
    images: z.array(z.string()).optional(),
    item_name: z.string().min(1, "Item name is required"),
    item_price: z.number().min(0, "Price must be positive"),
    rating: z.number().min(0).max(5).optional(),
    sku: z.string().optional(),
    stock: z.number().int().min(0),
    variant: z.array(z.object({
        variantProperty_id: z.string(),
        variantValue_id: z.string()
    })).optional(),
    variant_collections: z.array(z.object({
        item_id: z.string(),
        item_name: z.string()
    })).optional(),
});

export const UpdateItemSchema = AddItemSchema.extend({
    item_id: z.string(),
}).partial().required({ item_id: true });

export const ItemIdSchema = z.object({
    item_id: z.string()
});

export const UpdateItemDescriptionSchema = z.object({
    how_its_made: z.string().optional(),
    how_to_use: z.string().optional(),
    key_features: z.record(z.string(), z.string()).optional(),
    specifications: z.array(z.string()).optional(),
});
