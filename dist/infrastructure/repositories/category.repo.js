"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepo = void 0;
const GlobelErrorHandler_1 = require("../helper/middleware/GlobelErrorHandler");
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const category_1 = require("../orm/entities/category");
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
                select: ["category_id"],
                where: { category_id: input.parent_category_id },
            });
            if (!parent) {
                throw new Error("Parent category does not exist");
            }
            newCategory.parentCategory = parent;
        }
        await categoryRepo.save(newCategory);
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
    GetAllCategoryPage: async (em, data) => {
        const qb = em
            .getRepository(category_1.Category)
            .createQueryBuilder("category")
            .leftJoin("category.parentCategory", "parent")
            .select([
            "category.category_id AS category_id",
            "category.category_name AS category_name",
            "category.image_url AS image_url",
            "category.description AS description",
            "parent.category_id AS parent_category_id",
            "parent.category_name AS parent_category_name",
        ]);
        const cqb = em
            .getRepository(category_1.Category)
            .createQueryBuilder("category")
            .groupBy("category.category_id");
        return (0, pagination_helper_1.applyPaginationAndFilters)(qb, cqb, data, [
            "category.category_id",
            "category.category_name",
            "category.image_url",
            "category.description",
            "parent.category_id",
            "parent.category_name",
            "category_id",
            "category_name",
            "image_url",
            "description",
            "parent_category_name"
        ]);
    },
    searchCategoriesByName: async (em, query) => {
        return em
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
            .where("child.category_name LIKE CONCAT('%', :query, '%')", { query })
            .limit(5)
            .getRawMany();
    },
    updateCategory: async (em, input) => {
        const categoryRepo = em.getRepository(category_1.Category);
        const existing = await categoryRepo.findOne({
            where: { category_id: input.category_id },
        });
        if (!existing) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Category not found");
        }
        if (input.parent_category_id) {
            if (input.parent_category_id === input.category_id) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Category cannot be its own parent");
            }
            const parent = await categoryRepo.findOne({
                select: ["category_id"],
                where: { category_id: input.parent_category_id },
            });
            if (!parent) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Parent category does not exist");
            }
            existing.parentCategory = parent;
        }
        existing.category_name = input.category_name;
        existing.description = input.description;
        existing.image_url = input.image_url;
        await categoryRepo.save(existing);
        return true;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
