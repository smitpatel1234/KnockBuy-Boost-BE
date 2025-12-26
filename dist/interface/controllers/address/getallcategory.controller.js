"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getALLCategoryController = void 0;
const index_1 = require("../../../application/useCases/category/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getALLCategoryController = (CategoryRepo) => {
    return async (req, res) => CategoryRepo.wrapTransaction(async (t) => {
        {
            const data = await (0, index_1.getALL_category)(t, CategoryRepo);
            return (0, displaymessage_1.successmessage)(res, "Get all the categories successfully", data);
        }
    });
};
exports.getALLCategoryController = getALLCategoryController;
