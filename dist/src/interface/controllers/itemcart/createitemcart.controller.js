"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemCartController = void 0;
const index_1 = require("../../../application/useCases/itemcart/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.body.user.id;
            const { item, quantity } = req.body;
            const data = {
                item: item,
                quantity: quantity,
                user: user_id,
            };
            await (0, index_1.create_itemcart)(t, ItemCartRepo, data);
            (0, displaymessage_1.successmessage)(res, "add to cart successfully");
            return;
        }
    });
};
exports.createItemCartController = createItemCartController;
