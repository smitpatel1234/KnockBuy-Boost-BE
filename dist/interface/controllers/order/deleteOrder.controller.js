"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderController = void 0;
const deleteOrder_usecase_1 = require("../../../application/useCases/order/deleteOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const DeleteOrderController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const { id } = req.params;
        const success = await (0, deleteOrder_usecase_1.deleteOrder)(t, OrderRepo, id);
        if (success) {
            return (0, displaymessage_1.successmessage)(res, "Order deleted successfully");
        }
        throw new Error("Failed to delete order");
    });
};
exports.DeleteOrderController = DeleteOrderController;
