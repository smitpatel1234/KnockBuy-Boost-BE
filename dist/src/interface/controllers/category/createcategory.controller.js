"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryController = void 0;
const index_1 = require("../../../application/useCases/category/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createCategoryController = (CategoryRepo) => {
    return async (req, res) => CategoryRepo.wrapTransaction(async (t) => {
        {
            const data = req.body;
            await (0, index_1.create_category)(t, data, CategoryRepo);
            (0, displaymessage_1.successmessage)(res, "Category created successfully");
            return;
        }
    });
};
exports.createCategoryController = createCategoryController;
