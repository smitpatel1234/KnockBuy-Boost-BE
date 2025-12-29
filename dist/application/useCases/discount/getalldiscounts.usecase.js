"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_discounts = void 0;
const get_all_discounts = async (em, discountRepo) => {
    return await discountRepo.GetAllDiscounts(em);
};
exports.get_all_discounts = get_all_discounts;
