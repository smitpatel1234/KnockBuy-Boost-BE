import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { search_items } from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parseSearchPaginationParams } from "../../../infrastructure/helper/request.helper";

export const searchItemsController = (itemRepo: ItemRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        itemRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parseSearchPaginationParams(req);
            const itemsdata = await search_items(t, params, itemRepo);
            successmessage(res, "Search items successfully", itemsdata);
        });
};
