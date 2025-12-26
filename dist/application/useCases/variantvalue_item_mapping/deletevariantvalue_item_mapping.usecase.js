"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletevariantvalue_item_mapping = void 0;
const deletevariantvalue_item_mapping = async (entityManager, variantRepo, id) => {
    return await variantRepo.deleteItemVariantMapping(entityManager, id);
};
exports.deletevariantvalue_item_mapping = deletevariantvalue_item_mapping;
