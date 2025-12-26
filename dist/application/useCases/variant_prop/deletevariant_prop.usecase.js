"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_varient_property = void 0;
const delete_varient_property = async (entityManager, variantRepo, { variantProperty_id: id }) => {
    return await variantRepo.deleteProperty(entityManager, id);
};
exports.delete_varient_property = delete_varient_property;
