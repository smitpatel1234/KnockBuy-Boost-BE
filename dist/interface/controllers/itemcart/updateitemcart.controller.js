"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemCartController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const index_1 = require("../../../application/useCases/itemcart/index");
const updateItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const data = req.body;
            const IsUpdated = await (0, index_1.update_itemcart)(t, ItemCartRepo, data);
            if (!IsUpdated)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "addess Not Found");
            return (0, displaymessage_1.successmessage)(res, "address updated successfully");
        }
    });
};
exports.updateItemCartController = updateItemCartController;
