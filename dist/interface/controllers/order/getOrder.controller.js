"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderController = void 0;
const getOrder_usecase_1 = require("../../../application/useCases/order/getOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const User_models_1 = require("../../../domain/models/User.models");
const GetOrderController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const { id } = req.params;
        const user = req.body.user;
        if (!user)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "User not authenticated");
        const order = await (0, getOrder_usecase_1.getOrder)(t, OrderRepo, id);
        if (user.role !== User_models_1.UserRole.ADMIN && order.user.user_id !== user.user_id) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.FORBIDDEN, "Access denied");
        }
        return (0, displaymessage_1.successmessage)(res, "Order fetched successfully", order);
    });
};
exports.GetOrderController = GetOrderController;
