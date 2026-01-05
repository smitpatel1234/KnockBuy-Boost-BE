import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";

export const deleteOrder = async (
    entitiesManager: EntityManager,
    OrderRepo: OrderRepoPort,
    order_id: string
): Promise<boolean> => {
    return OrderRepo.DeleteOrder(entitiesManager, order_id);
};
