"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createvariantvalue_item_mapping = void 0;
const createvariantvalue_item_mapping = async (entityManager, variantRepo, data) => {
    return await variantRepo.mapItemToVariantValue(entityManager, data);
};
exports.createvariantvalue_item_mapping = createvariantvalue_item_mapping;
