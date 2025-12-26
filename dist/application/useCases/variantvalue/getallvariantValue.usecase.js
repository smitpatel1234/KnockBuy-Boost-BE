"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall_variant_values = void 0;
const getall_variant_values = async (entityManager, variantRepo) => {
    return await variantRepo.getall_variant_values(entityManager, {});
};
exports.getall_variant_values = getall_variant_values;
