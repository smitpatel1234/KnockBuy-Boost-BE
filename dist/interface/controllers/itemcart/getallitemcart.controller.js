"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemCartController = void 0;
const index_1 = require("../../../application/useCases/itemcart/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.body.user.id;
            if (!user_id)
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
            const data = await (0, index_1.get_itemcart)(t, ItemCartRepo, user_id);
            return (0, displaymessage_1.successmessage)(res, "Get all the addess successfully", data);
        }
    });
};
exports.getItemCartController = getItemCartController;
