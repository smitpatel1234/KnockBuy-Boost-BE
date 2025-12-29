"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallCategoryPage = void 0;
const getallCategoryPage = (categoryRepo) => {
    return async (t, data) => {
        return await categoryRepo.GetAllCategoryPage(t, data);
    };
};
exports.getallCategoryPage = getallCategoryPage;
