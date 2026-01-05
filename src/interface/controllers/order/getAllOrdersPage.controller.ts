import Express from "express";
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { getAllOrdersPage } from "../../../application/useCases/order/getAllOrdersPage.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";

export const GetAllOrdersPageController = (OrderRepo: OrderRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        OrderRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);

            const data = await getAllOrdersPage(t, OrderRepo, params);
            successmessage(res, "Orders fetched successfully", data);
        });
};
