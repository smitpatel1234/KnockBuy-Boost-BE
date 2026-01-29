"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantCollectionController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const deleteVariantCollectionController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const variant_collection_id = req.body.variant_collection_id;
        await variantRepo.deleteVariantCollection(t, variant_collection_id);
        (0, displaymessage_1.successmessage)(res, "Variant collection mapping deleted successfully");
        return;
    });
};
exports.deleteVariantCollectionController = deleteVariantCollectionController;
