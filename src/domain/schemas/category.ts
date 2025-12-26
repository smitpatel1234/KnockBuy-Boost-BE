import e from "express";
import * as zod from "zod";

export const AddCategorySchema = zod.object({
    category_name: zod.string(),
    parent_category_id: zod.string().optional(),
    childCategories: zod.array(zod.string()).optional(),
    image_url: zod.string().optional(),
    description: zod.string().optional(),
});
export const UpdateCategorySchema = AddCategorySchema.extend({
    category_id: zod.uuid(),
})
export const DeleteCategorySchema = zod.object({
    category_id: zod.uuid(),
}) 