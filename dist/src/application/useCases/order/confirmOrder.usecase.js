"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOrder = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const confirmOrder = async (em, orderRepo, data) => {
    const userOrders = await orderRepo.getOrdersByUserId(em, data.user_id);
    const order = userOrders.find(o => o.order_id === data.order_id);
    if (!order) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Order not found or access denied");
    }
    if (order.status === "confirmed" || order.status === "placed") {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Order is already confirmed");
    }
    const updateData = {
        address_id: data.address_id,
        delivery_status: "pending",
        order_id: data.order_id,
        payment_method: data.payment_method,
        payment_status: data.payment_method === "CASH_ON_DELIVERY" ? "pending" : "paid",
        status: "placed"
    };
    return await orderRepo.UpdateOrder(em, updateData);
};
exports.confirmOrder = confirmOrder;
