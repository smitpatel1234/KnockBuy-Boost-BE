"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoryPageController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const getall_category_page_usecase_1 = require("../../../application/useCases/category/getall_category_page.usecase");
const getAllCategoryPageController = (categoryRepo) => {
    return async (req, res) => categoryRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const data = await (0, getall_category_page_usecase_1.getallCategoryPage)(t, categoryRepo, params);
        return (0, displaymessage_1.successmessage)(res, "Categories fetched successfully", data);
    });
};
exports.getAllCategoryPageController = getAllCategoryPageController;
