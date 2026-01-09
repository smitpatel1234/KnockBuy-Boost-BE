"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemVariantValueMapping_Controller = void 0;
const index_1 = require("../../../application/useCases/variantvalue_item_mapping/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const deleteItemVariantValueMapping_Controller = (VariantRepo) => {
    return async (req, res) => VariantRepo.wrapTransaction(async (t) => {
        const { variant_value_id } = req.body;
        await (0, index_1.deletevariantvalue_item_mapping)(t, VariantRepo, variant_value_id);
        (0, displaymessage_1.successmessage)(res, "Item variant value mapping deleted successfully");
    });
};
exports.deleteItemVariantValueMapping_Controller = deleteItemVariantValueMapping_Controller;
