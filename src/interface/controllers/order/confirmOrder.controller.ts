import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { confirmOrder } from "../../../application/useCases/order/confirmOrder.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const ConfirmOrderController = (OrderRepo: OrderRepoPort) => {
    return async (req: AuthRequest<{ address_id: string; payment_method: string }>, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const { id } = req.params;
            const user_id = req.body.user.id;
            const { address_id, payment_method } = req.body;

            if (!user_id) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "User not authenticated");
            if (!address_id || !payment_method) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Address and Payment Method are required");
            await confirmOrder(t, OrderRepo, {
                address_id,
                order_id: id,
                payment_method,
                user_id
            });
            successmessage(res, "Order confirmed successfully");
        });
};
