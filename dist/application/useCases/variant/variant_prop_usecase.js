"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_varient_property = exports.update_varient_property = exports.getall_variant_properties = exports.create_varient_property = void 0;
const create_varient_property = async (entityManager, variantRepo, data) => {
    return await variantRepo.createProperty(entityManager, data);
};
exports.create_varient_property = create_varient_property;
const getall_variant_properties = async (entityManager, variantRepo) => {
    return await variantRepo.getAllVariantProperties(entityManager);
};
exports.getall_variant_properties = getall_variant_properties;
const update_varient_property = async (entityManager, variantRepo, data) => {
    return await variantRepo.updateProperty(entityManager, data);
};
exports.update_varient_property = update_varient_property;
const delete_varient_property = async (entityManager, variantRepo, id) => {
    return await variantRepo.deleteProperty(entityManager, id);
};
exports.delete_varient_property = delete_varient_property;
