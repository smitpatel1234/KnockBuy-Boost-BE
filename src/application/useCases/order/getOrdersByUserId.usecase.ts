import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";

export const getOrdersByUserId = async (
    entitiesManager: EntityManager,
    OrderRepo: OrderRepoPort,
    user_id: string
) => {
    return OrderRepo.getOrdersByUserId(entitiesManager, user_id);
};
