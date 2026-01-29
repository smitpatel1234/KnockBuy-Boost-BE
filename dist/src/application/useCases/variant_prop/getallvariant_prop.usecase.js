"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getall_variant_properties = void 0;
const getall_variant_properties = async (entityManager, variantRepo) => {
    return await variantRepo.getAllVariantProperties(entityManager);
};
exports.getall_variant_properties = getall_variant_properties;
