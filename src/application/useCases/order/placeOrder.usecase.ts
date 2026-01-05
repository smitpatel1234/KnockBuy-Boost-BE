import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { PlaceOrder } from "../../../domain/models/order.models";

export const placeOrder = async (
    entitiesManager: EntityManager,
    OrderRepo: OrderRepoPort,
    ItemCartRepo: ItemCartRepoPort,
    data: PlaceOrder
) => {
    const orderId = await OrderRepo.placeOrder(entitiesManager, data);
    if (orderId && data.user_id) {
        await ItemCartRepo.clearCartEntry(entitiesManager, data.user_id);
    }
    return orderId;
};
