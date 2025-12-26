"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemVariantValueMapping_Controller = void 0;
const index_1 = require("../../../application/useCases/variantvalue_item_mapping/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createItemVariantValueMapping_Controller = (VariantRepo) => {
    return async (req, res) => VariantRepo.wrapTransaction(async (t) => {
        const data = req.body;
        await (0, index_1.createvariantvalue_item_mapping)(t, VariantRepo, data);
        return (0, displaymessage_1.successmessage)(res, "Item variant value mapping created successfully");
    });
};
exports.createItemVariantValueMapping_Controller = createItemVariantValueMapping_Controller;
