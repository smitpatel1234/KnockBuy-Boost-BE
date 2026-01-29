"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_variant_value = void 0;
const create_variant_value = async (entityManager, variantRepo, data) => {
    return await variantRepo.createValue(entityManager, data);
};
exports.create_variant_value = create_variant_value;
