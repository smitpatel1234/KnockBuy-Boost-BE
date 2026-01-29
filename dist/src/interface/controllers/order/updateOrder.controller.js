"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderController = void 0;
const updateOrder_usecase_1 = require("../../../application/useCases/order/updateOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const UpdateOrderController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const { id } = req.params;
        const data = req.body;
        data.order_id = id;
        const success = await (0, updateOrder_usecase_1.updateOrder)(t, OrderRepo, data);
        if (success) {
            (0, displaymessage_1.successmessage)(res, "Order updated successfully");
            return;
        }
        throw new Error("Failed to update order");
    });
};
exports.UpdateOrderController = UpdateOrderController;
