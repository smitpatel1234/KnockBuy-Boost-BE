"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = void 0;
const deleteOrder = async (entitiesManager, OrderRepo, order_id) => {
    return OrderRepo.DeleteOrder(entitiesManager, order_id);
};
exports.deleteOrder = deleteOrder;
