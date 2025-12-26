"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_varient_property = void 0;
const create_varient_property = async (entityManager, variantRepo, data) => {
    return await variantRepo.createProperty(entityManager, data);
};
exports.create_varient_property = create_varient_property;
