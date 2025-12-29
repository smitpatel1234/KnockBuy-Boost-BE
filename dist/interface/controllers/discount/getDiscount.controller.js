"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscountController = void 0;
const discount_1 = require("../../../application/useCases/discount");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getDiscountController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const { id } = req.query;
        if (!id)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Discount ID is required");
        const discount = await (0, discount_1.get_discount)(t, id, discountRepo);
        if (!discount)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Discount Not Found");
        return (0, displaymessage_1.successmessage)(res, "Get discount successfully", discount);
    });
};
exports.getDiscountController = getDiscountController;
