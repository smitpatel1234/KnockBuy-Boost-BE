"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserId = void 0;
const getOrdersByUserId = async (entitiesManager, OrderRepo, user_id) => {
    return OrderRepo.getOrdersByUserId(entitiesManager, user_id);
};
exports.getOrdersByUserId = getOrdersByUserId;
