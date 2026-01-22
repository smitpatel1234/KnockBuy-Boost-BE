"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const updateItemController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const data = req.body;
        console.log("data in controller", data);
        const IsUpdated = await (0, item_1.update_item)(t, data, itemRepo);
        if (!IsUpdated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
        (0, displaymessage_1.successmessage)(res, "Item updated successfully");
    });
};
exports.updateItemController = updateItemController;
