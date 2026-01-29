"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_varient_property = void 0;
const update_varient_property = async (entityManager, variantRepo, data) => {
    return await variantRepo.updateProperty(entityManager, data);
};
exports.update_varient_property = update_varient_property;
