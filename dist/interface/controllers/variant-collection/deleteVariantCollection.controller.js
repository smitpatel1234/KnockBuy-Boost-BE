"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantCollectionController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteVariantCollectionController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const { variant_collection_id } = req.body;
        try {
            await variantRepo.deleteVariantCollection(t, variant_collection_id);
            return (0, displaymessage_1.successmessage)(res, "Variant collection mapping deleted successfully");
        }
        catch (err) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Failed to delete variant collection mapping");
        }
    });
};
exports.deleteVariantCollectionController = deleteVariantCollectionController;
