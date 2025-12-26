"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVariantValueController = void 0;
const index_1 = require("../../../application/useCases/variantvalue/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const updateVariantValueController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsUpdate = await (0, index_1.update_variant_value)(t, variantRepo, data);
        if (!IsUpdate)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Variant Value Not Found");
        return (0, displaymessage_1.successmessage)(res, "Variant value updated successfully");
    });
};
exports.updateVariantValueController = updateVariantValueController;
