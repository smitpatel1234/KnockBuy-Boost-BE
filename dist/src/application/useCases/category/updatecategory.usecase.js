"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_category = void 0;
const update_category = async (EntityManager, CategoryRepo, category) => {
    return await CategoryRepo.updateCategory(EntityManager, category);
};
exports.update_category = update_category;
