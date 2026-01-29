"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVariantPropController = void 0;
const index_1 = require("../../../application/useCases/variant_prop/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const UpdateVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsUpdated = await (0, index_1.update_varient_property)(t, variantRepo, data);
        if (!IsUpdated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Variant Property Not Found");
        (0, displaymessage_1.successmessage)(res, "Variant property updated successfully");
    });
};
exports.UpdateVariantPropController = UpdateVariantPropController;
