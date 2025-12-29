"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallvariantValuePage = void 0;
const getallvariantValuePage = (variantRepo) => {
    return async (em, data) => {
        return await variantRepo.getall_variant_values_page(em, data);
    };
};
exports.getallvariantValuePage = getallvariantValuePage;
