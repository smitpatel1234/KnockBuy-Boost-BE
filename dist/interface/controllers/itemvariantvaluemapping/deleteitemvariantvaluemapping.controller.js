"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemVariantValueMapping_Controller = void 0;
const index_1 = require("../../../application/useCases/variantvalue_item_mapping/index");
const deleteItemVariantValueMapping_Controller = (VariantRepo) => {
    return async (req, res) => VariantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, index_1.deletevariantvalue_item_mapping)(t, VariantRepo, data);
    });
};
exports.deleteItemVariantValueMapping_Controller = deleteItemVariantValueMapping_Controller;
