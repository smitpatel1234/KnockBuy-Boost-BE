"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceorderController = void 0;
const placeOrder_usecase_1 = require("../../../application/useCases/order/placeOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const PlaceorderController = (OrderRepo, ItemCartRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const user_id = req.body.user.id;
        const placeorderparams = {
            address_id: data.address_id,
            discount_id: data.discount_id,
            payment_method: data.payment_method,
            user_id: user_id,
        };
        const order_id = await (0, placeOrder_usecase_1.placeOrder)(t, OrderRepo, ItemCartRepo, placeorderparams);
        (0, displaymessage_1.successmessage)(res, "Order placed successfully", { order_id });
    });
};
exports.PlaceorderController = PlaceorderController;
