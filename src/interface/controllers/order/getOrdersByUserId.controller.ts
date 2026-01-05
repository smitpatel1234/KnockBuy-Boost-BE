import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { getOrdersByUserId } from "../../../application/useCases/order/getOrdersByUserId.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const GetOrdersByUserIdController = (OrderRepo: OrderRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const user_id = req.body.user?.id || req.body.user?.user_id;
            const orders = await getOrdersByUserId(t, OrderRepo, user_id);
            successmessage(res, "Order history fetched successfully", orders);
        });
};
