"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_variant_value = void 0;
const delete_variant_value = async (entityManager, variantRepo, id) => {
    return await variantRepo.deleteValue(entityManager, id);
};
exports.delete_variant_value = delete_variant_value;
