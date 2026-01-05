import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { UpdateOrderModel } from "../../../domain/models/order.models";

export const updateOrder = async (
    entitiesManager: EntityManager,
    OrderRepo: OrderRepoPort,
    data: UpdateOrderModel
): Promise<boolean> => {
    return OrderRepo.UpdateOrder(entitiesManager, data);
};
