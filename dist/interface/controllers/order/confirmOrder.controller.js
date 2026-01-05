"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmOrderController = void 0;
const confirmOrder_usecase_1 = require("../../../application/useCases/order/confirmOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const ConfirmOrderController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const { id } = req.params;
        const user_id = req.body.user.id;
        const { address_id, payment_method } = req.body;
        if (!user_id)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "User not authenticated");
        if (!address_id || !payment_method)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Address and Payment Method are required");
        await (0, confirmOrder_usecase_1.confirmOrder)(t, OrderRepo, {
            order_id: id,
            user_id,
            address_id,
            payment_method
        });
        return (0, displaymessage_1.successmessage)(res, "Order confirmed successfully");
    });
};
exports.ConfirmOrderController = ConfirmOrderController;
