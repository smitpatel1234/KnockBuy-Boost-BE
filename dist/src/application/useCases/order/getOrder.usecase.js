"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getOrder = async (em, orderRepo, order_id) => {
    const order = await orderRepo.getOrderById(em, order_id);
    if (!order) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Order not found");
    }
    return order;
};
exports.getOrder = getOrder;
