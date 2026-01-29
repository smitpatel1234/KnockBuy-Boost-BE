"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromo = void 0;
const validatePromo = async (em, code, discountRepo) => {
    const discount = await discountRepo.GetDiscountByCode(em, code);
    if (!discount || discount.active_flag === 0) {
        return null;
    }
    // You can add more complex rules here (expiry, usage limits, etc.)
    return discount;
};
exports.validatePromo = validatePromo;
