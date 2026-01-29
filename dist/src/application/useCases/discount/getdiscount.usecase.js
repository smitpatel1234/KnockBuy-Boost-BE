"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_discount = void 0;
const get_discount = async (em, id, discountRepo) => {
    return await discountRepo.GetDiscountById(em, id);
};
exports.get_discount = get_discount;
