"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_discounts_page = void 0;
const get_all_discounts_page = async (em, data, discountRepo) => {
    return await discountRepo.GetAllDiscountsPage(em, data);
};
exports.get_all_discounts_page = get_all_discounts_page;
