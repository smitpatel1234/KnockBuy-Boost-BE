"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiscountController = void 0;
const discount_1 = require("../../../application/useCases/discount");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteDiscountController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const { discount_id } = req.body;
        const IsDeleted = await (0, discount_1.delete_discount)(t, discount_id, discountRepo);
        if (!IsDeleted)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Discount Not Found");
        return (0, displaymessage_1.successmessage)(res, "Discount deleted successfully");
    });
};
exports.deleteDiscountController = deleteDiscountController;
