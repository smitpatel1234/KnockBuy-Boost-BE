import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { updateOrder } from "../../../application/useCases/order/updateOrder.usecase";
import { UpdateOrderModel } from "../../../domain/models/order.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const UpdateOrderController = (OrderRepo: OrderRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const { id } = req.params;
            const data = req.body as UpdateOrderModel;
            data.order_id = id;

            const success = await updateOrder(t, OrderRepo, data);
            if (success) {
                successmessage(res, "Order updated successfully"); return;
            }
            throw new Error("Failed to update order");
        });
};
