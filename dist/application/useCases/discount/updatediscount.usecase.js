"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_discount = void 0;
const update_discount = async (em, discount, discountRepo) => {
    return await discountRepo.UpdateDiscount(em, discount);
};
exports.update_discount = update_discount;
