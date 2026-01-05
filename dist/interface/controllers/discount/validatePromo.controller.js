"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromoController = void 0;
const validatePromo_usecase_1 = require("../../../application/useCases/discount/validatePromo.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const validatePromoController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const { code } = req.body;
        if (!code)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Promo code is required");
        const discount = await (0, validatePromo_usecase_1.validatePromo)(t, code, discountRepo);
        if (!discount)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Invalid or inactive promo code");
        return (0, displaymessage_1.successmessage)(res, "Promo code validated successfully", discount);
    });
};
exports.validatePromoController = validatePromoController;
