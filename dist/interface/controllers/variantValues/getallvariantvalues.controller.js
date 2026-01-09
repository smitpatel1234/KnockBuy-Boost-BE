"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVariantValuesController = void 0;
const index_1 = require("../../../application/useCases/variantvalue/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAllVariantValuesController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = await (0, index_1.getall_variant_values)(t, variantRepo);
        (0, displaymessage_1.successmessage)(res, "Get all the variant values successfully", data);
    });
};
exports.getAllVariantValuesController = getAllVariantValuesController;
