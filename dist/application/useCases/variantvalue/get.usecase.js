"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_variant_value = exports.update_variant_value = exports.create_variant_value = exports.getall_variant_values = void 0;
const getall_variant_values = async (entityManager, variantRepo) => {
    return await variantRepo.getall_variant_values(entityManager, {});
};
exports.getall_variant_values = getall_variant_values;
const create_variant_value = async (entityManager, variantRepo, data) => {
    return await variantRepo.createValue(entityManager, data);
};
exports.create_variant_value = create_variant_value;
const update_variant_value = async (entityManager, variantRepo, data) => {
    return await variantRepo.updateValue(entityManager, data);
};
exports.update_variant_value = update_variant_value;
const delete_variant_value = async (entityManager, variantRepo, id) => {
    return await variantRepo.deleteValue(entityManager, id);
};
exports.delete_variant_value = delete_variant_value;
