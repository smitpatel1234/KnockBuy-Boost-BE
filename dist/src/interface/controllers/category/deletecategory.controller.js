"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = void 0;
const index_1 = require("../../../application/useCases/category/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteCategoryController = (CategoryRepo) => {
    return async (req, res) => CategoryRepo.wrapTransaction(async (t) => {
        {
            const category_id = req.body.category_id;
            const IsDeleted = await (0, index_1.delete_category)(t, CategoryRepo, category_id);
            if (!IsDeleted)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Category Not Found");
            (0, displaymessage_1.successmessage)(res, "Category deleted successfully");
            return;
        }
    });
};
exports.deleteCategoryController = deleteCategoryController;
