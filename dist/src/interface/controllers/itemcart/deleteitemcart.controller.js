"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemCartController = void 0;
const index_1 = require("../../../application/useCases/itemcart/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const deleteItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const cart_item_id = req.body.cart_item_id;
            const IsDeleted = await (0, index_1.delete_itemcart)(t, ItemCartRepo, { cart_item_id: cart_item_id });
            if (!IsDeleted)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "addess Not Found");
            (0, displaymessage_1.successmessage)(res, "item from cart removed successfully");
            return;
        }
    });
};
exports.deleteItemCartController = deleteItemCartController;
