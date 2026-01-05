"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceorderController = void 0;
const placeOrder_usecase_1 = require("../../../application/useCases/order/placeOrder.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const PlaceorderController = (OrderRepo, ItemCartRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const data = req.body;
        const user_id = req.body.user.id;
        if (!user_id)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "User not authenticated");
        if (!data.address_id)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Address is required");
        if (!data.payment_method)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "Payment method is required");
        const placeorderparams = {
            user_id: user_id,
            address_id: data.address_id,
            discount_id: data.discount_id,
            payment_method: data.payment_method,
        };
        const order_id = await (0, placeOrder_usecase_1.placeOrder)(t, OrderRepo, ItemCartRepo, placeorderparams);
        return (0, displaymessage_1.successmessage)(res, "Order placed successfully", { order_id });
    });
};
exports.PlaceorderController = PlaceorderController;
