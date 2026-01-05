import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { getOrder } from "../../../application/useCases/order/getOrder.usecase";
import { UserRole } from "../../../domain/models/User.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const GetOrderController = (OrderRepo: OrderRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const { id } = req.params;
            const user = req.body.user;

            if (!user) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "User not authenticated");

            const order = await getOrder(t, OrderRepo, id);

            if (user.role !== UserRole.ADMIN && order.user.user_id !== user.user_id) {
                throw new ApplicationError(ApplicationErrorType.FORBIDDEN, "Access denied");
            }

            successmessage(res, "Order fetched successfully", order);
        });
};
