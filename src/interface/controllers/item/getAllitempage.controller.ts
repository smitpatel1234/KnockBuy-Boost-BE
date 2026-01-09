import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { get_all_items_page } from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";

export const getAllItemsPageController = (itemRepo: ItemRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const params = parsePaginationParams(req);
      const itemsdata = await get_all_items_page(t, params, itemRepo);
      successmessage(res, "Get all the items successfully", itemsdata);
    });
};
