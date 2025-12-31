"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemCartController = void 0;
const index_1 = require("../../../application/useCases/itemcart/index");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createItemCartController = (ItemCartRepo) => {
    return async (req, res) => ItemCartRepo.wrapTransaction(async (t) => {
        {
            const user_id = req.body.user.id;
            const itemcart = req.body;
            const data = {
                item: itemcart.item,
                user: user_id,
                quantity: itemcart.quantity,
                added_at: new Date(),
            };
            console.log(data);
            await (0, index_1.create_itemcart)(t, ItemCartRepo, data);
            return (0, displaymessage_1.successmessage)(res, "add to cart successfully");
        }
    });
};
exports.createItemCartController = createItemCartController;
