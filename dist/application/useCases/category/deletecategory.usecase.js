"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_category = void 0;
const delete_category = async (entityManager, CategoryRepo, category_id) => {
    return await CategoryRepo.deleteCategory(entityManager, category_id);
};
exports.delete_category = delete_category;
