"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepo = void 0;
const category_1 = require("../orm/entities/category");
const transaction_1 = require("../helper/transaction");
exports.CategoryRepo = {
    createCategory: async (em, input) => {
        const categoryRepo = em.getRepository(category_1.Category);
        const newCategory = categoryRepo.create({
            category_name: input.category_name,
            description: input.description,
            image_url: input.image_url,
        });
        if (input.parent_category_id) {
            const parent = await categoryRepo.findOne({
                where: { category_id: input.parent_category_id },
                select: ["category_id"],
            });
            if (!parent) {
                throw new Error("Parent category does not exist");
            }
            newCategory.parentCategory = parent;
        }
        await categoryRepo.save(newCategory);
    },
    updateCategory: async (em, input) => {
        const categoryRepo = em.getRepository(category_1.Category);
        const existing = await categoryRepo.findOne({
            where: { category_id: input.category_id },
        });
        if (!existing) {
            throw new Error("Category not found");
        }
        if (input.parent_category_id) {
            if (input.parent_category_id === input.category_id) {
                throw new Error("Category cannot be its own parent");
            }
            const parent = await categoryRepo.findOne({
                where: { category_id: input.parent_category_id },
                select: ["category_id"],
            });
            if (!parent) {
                throw new Error("Parent category does not exist");
            }
            existing.parentCategory = parent;
        }
        existing.category_name = input.category_name;
        existing.description = input.description;
        existing.image_url = input.image_url;
        await categoryRepo.save(existing);
        return true;
    },
    deleteCategory: async (em, category_id) => {
        const u = await em.getRepository(category_1.Category).delete(category_id);
        return (u.affected ?? 0) > 0;
    },
    getAllCategories: async (em) => {
        const categories = await em
            .getRepository(category_1.Category)
            .createQueryBuilder("child")
            .leftJoin(category_1.Category, "parent", "parent.category_id = child.parentCategory")
            .select([
            "child.category_id AS category_id",
            "child.category_name AS category_name",
            "child.image_url AS image_url",
            "child.description AS description",
            "parent.category_id AS parent_category_id",
            "parent.category_name AS parent_category_name",
        ])
            .getRawMany();
        return categories;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
