"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantValueController = void 0;
const index_1 = require("../../../application/useCases/variantvalue/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteVariantValueController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const id = req.body.variantValue_id;
        const IsDeleted = await (0, index_1.delete_variant_value)(t, variantRepo, id);
        if (!IsDeleted)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Variant Value Not Found");
        (0, displaymessage_1.successmessage)(res, "Variant value deleted successfully");
    });
};
exports.deleteVariantValueController = deleteVariantValueController;
