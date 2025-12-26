"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantPropController = void 0;
const index_1 = require("../../../application/useCases/variant_prop/index");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const deleteVariantPropController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsDeleted = await (0, index_1.delete_varient_property)(t, variantRepo, data);
        if (!IsDeleted)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, ("Variant Property Not Found"));
        return (0, displaymessage_1.successmessage)(res, "Variant property deleted successfully");
    });
};
exports.deleteVariantPropController = deleteVariantPropController;
