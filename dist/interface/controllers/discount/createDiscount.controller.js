"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscountController = void 0;
const discount_1 = require("../../../application/useCases/discount");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const createDiscountController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsCreated = await (0, discount_1.create_discount)(t, data, discountRepo);
        if (!IsCreated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Discount Not Created");
        (0, displaymessage_1.successmessage)(res, "Discount created successfully");
    });
};
exports.createDiscountController = createDiscountController;
