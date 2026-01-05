import * as zod from "zod";

export const ItemCartSchema = zod.object({
    item: zod.string(),
    quantity: zod.number().min(1),
});

export const UpdateItemCartSchema = ItemCartSchema.extend({
    cart_item_id: zod.string(),
    quantity: zod.number().min(1),
}).partial().required({ cart_item_id: true });

export const ItemCartIdSchema = zod.object({
    cart_item_id: zod.string(),
});

