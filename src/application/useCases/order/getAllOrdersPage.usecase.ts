import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { pageParams, PaginationResponse } from "../../../domain/globalTypes/commonFields";
import { OrderAllType } from "../../../domain/models/order.models";

export const getAllOrdersPage = async (
    entitiesManager: EntityManager,
    OrderRepo: OrderRepoPort,
    data: pageParams
): Promise<PaginationResponse<OrderAllType>> => {
    return OrderRepo.GetAllOrdersPage(entitiesManager, data);
};
