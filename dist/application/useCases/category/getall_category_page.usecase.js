"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallCategoryPage = void 0;
const getallCategoryPage = async (t, categoryRepo, data) => {
    return await categoryRepo.GetAllCategoryPage(t, data);
};
exports.getallCategoryPage = getallCategoryPage;
