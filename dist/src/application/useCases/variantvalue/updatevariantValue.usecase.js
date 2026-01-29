"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_variant_value = void 0;
const update_variant_value = async (entityManager, variantRepo, data) => {
    return await variantRepo.updateValue(entityManager, data);
};
exports.update_variant_value = update_variant_value;
