"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariantPropController = void 0;
const index_1 = require("../../../application/useCases/variant_prop/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const result = await (0, index_1.create_varient_property)(t, variantRepo, data);
        return (0, displaymessage_1.successmessage)(res, "Variant property created successfully");
    });
};
exports.createVariantPropController = createVariantPropController;
