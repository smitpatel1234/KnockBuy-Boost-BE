"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVariantPropertiesController = void 0;
const index_1 = require("../../../application/useCases/variant_prop/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAllVariantPropertiesController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = await (0, index_1.getall_variant_properties)(t, variantRepo);
        (0, displaymessage_1.successmessage)(res, "Get all the variant properties successfully", data);
    });
};
exports.getAllVariantPropertiesController = getAllVariantPropertiesController;
