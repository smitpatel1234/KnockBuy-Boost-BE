import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { deleteOrder } from "../../../application/useCases/order/deleteOrder.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const DeleteOrderController = (OrderRepo: OrderRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const { id } = req.params;
            const success = await deleteOrder(t, OrderRepo, id);
            if (success) {
                successmessage(res, "Order deleted successfully"); return;
            }
            throw new Error("Failed to delete order");
        });
};
