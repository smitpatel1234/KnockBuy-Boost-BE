"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersPage = void 0;
const getAllOrdersPage = async (entitiesManager, OrderRepo, data) => {
    return OrderRepo.GetAllOrdersPage(entitiesManager, data);
};
exports.getAllOrdersPage = getAllOrdersPage;
