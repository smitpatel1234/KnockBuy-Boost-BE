"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariantValueController = void 0;
const index_1 = require("../../../application/useCases/variantvalue/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createVariantValueController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, index_1.create_variant_value)(t, variantRepo, data);
        return (0, displaymessage_1.successmessage)(res, "Variant value created successfully");
    });
};
exports.createVariantValueController = createVariantValueController;
