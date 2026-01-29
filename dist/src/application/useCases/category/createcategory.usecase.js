"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_category = void 0;
const create_category = async (em, category, CategoryRepo) => {
    await CategoryRepo.createCategory(em, category);
};
exports.create_category = create_category;
