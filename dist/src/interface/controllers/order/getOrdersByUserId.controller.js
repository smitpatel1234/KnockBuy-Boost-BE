"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrdersByUserIdController = void 0;
const getOrdersByUserId_usecase_1 = require("../../../application/useCases/order/getOrdersByUserId.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GetOrdersByUserIdController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const user_id = req.body.user.id;
        const orders = await (0, getOrdersByUserId_usecase_1.getOrdersByUserId)(t, OrderRepo, user_id);
        (0, displaymessage_1.successmessage)(res, "Order history fetched successfully", orders);
    });
};
exports.GetOrdersByUserIdController = GetOrdersByUserIdController;
