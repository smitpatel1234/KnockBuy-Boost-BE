"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_discount = void 0;
const delete_discount = async (em, id, discountRepo) => {
    return await discountRepo.DeleteDiscount(em, id);
};
exports.delete_discount = delete_discount;
