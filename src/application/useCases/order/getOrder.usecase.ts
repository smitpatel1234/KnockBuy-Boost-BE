import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const getOrder = async (
    em: EntityManager,
    orderRepo: OrderRepoPort,
    order_id: string
) => {
    const order = await orderRepo.getOrderById(em, order_id);
    if (!order) {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Order not found");
    }
    return order;
};
