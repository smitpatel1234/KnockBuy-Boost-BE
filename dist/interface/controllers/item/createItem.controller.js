"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemController = void 0;
const item_1 = require("../../../application/useCases/item");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const createItemController = (itemRepo) => {
    return async (req, res) => itemRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const IsCreated = await (0, item_1.create_item)(t, data, itemRepo);
        if (!IsCreated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Item Not Found");
        return (0, displaymessage_1.successmessage)(res, "Item created successfully");
    });
};
exports.createItemController = createItemController;
