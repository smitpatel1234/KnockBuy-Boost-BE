"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_discount = void 0;
const create_discount = async (em, discount, discountRepo) => {
    return await discountRepo.CreateDiscount(em, discount);
};
exports.create_discount = create_discount;
