"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const placeOrder = async (entitiesManager, OrderRepo, ItemCartRepo, data) => {
    const orderId = await OrderRepo.placeOrder(entitiesManager, data);
    if (orderId && data.user_id) {
        await ItemCartRepo.clearCartEntry(entitiesManager, data.user_id);
    }
    return orderId;
};
exports.placeOrder = placeOrder;
