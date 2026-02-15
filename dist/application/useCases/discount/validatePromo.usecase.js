"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromo = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const validatePromo = async (em, code, discountRepo, user_id) => {
    const discount = await discountRepo.GetDiscountByCode(em, code);
    if (!discount || discount.active_flag === 0) {
        return null;
    }
    const alreadyApplied = await discountRepo.AlreadyApplied(em, discount.discount_id, user_id);
    if (alreadyApplied) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "already applied promo code");
        ;
    }
    return discount;
};
exports.validatePromo = validatePromo;
