"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getALL_category = void 0;
const getALL_category = async (EntityManager, CategoryRepo) => {
    return await CategoryRepo.getAllCategories(EntityManager);
};
exports.getALL_category = getALL_category;
