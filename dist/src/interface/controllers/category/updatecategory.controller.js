"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryController = void 0;
const index_1 = require("../../../application/useCases/category/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const updateCategoryController = (CategoryRepo) => {
    return async (req, res) => CategoryRepo.wrapTransaction(async (t) => {
        {
            const data = req.body;
            const IsUpdated = await (0, index_1.update_category)(t, CategoryRepo, data);
            if (!IsUpdated)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Category Not Found");
            (0, displaymessage_1.successmessage)(res, "Category updated successfully");
            return;
        }
    });
};
exports.updateCategoryController = updateCategoryController;
