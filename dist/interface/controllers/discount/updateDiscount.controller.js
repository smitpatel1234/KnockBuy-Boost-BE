"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDiscountController = void 0;
const discount_1 = require("../../../application/useCases/discount");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const updateDiscountController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsUpdated = await (0, discount_1.update_discount)(t, data, discountRepo);
        if (!IsUpdated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Discount Not Found");
        return (0, displaymessage_1.successmessage)(res, "Discount updated successfully");
    });
};
exports.updateDiscountController = updateDiscountController;
