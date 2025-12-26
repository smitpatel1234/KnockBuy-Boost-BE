"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteItemController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const { item_id } = req.body;
        const IsDeleted = await (0, item_1.delete_item)(t, item_id, itemRepo);
        if (!IsDeleted)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, ("Item Not Found"));
        return (0, displaymessage_1.successmessage)(res, "Item deleted successfully");
    });
};
exports.deleteItemController = deleteItemController;
