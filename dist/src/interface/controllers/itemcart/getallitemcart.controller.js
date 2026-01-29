"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemCartController = void 0;
const index_1 = require("../../../application/useCases/itemcart/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.body.user.id;
            const data = await (0, index_1.get_itemcart)(t, ItemCartRepo, user_id);
            (0, displaymessage_1.successmessage)(res, "Get all the cart item successfully", data);
            return;
        }
    });
};
exports.getItemCartController = getItemCartController;
