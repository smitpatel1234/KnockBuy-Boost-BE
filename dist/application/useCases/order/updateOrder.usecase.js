"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = void 0;
const updateOrder = async (entitiesManager, OrderRepo, data) => {
    return OrderRepo.UpdateOrder(entitiesManager, data);
};
exports.updateOrder = updateOrder;
