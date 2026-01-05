import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { get_all_items } from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const getAllItemsController = (itemRepo: ItemRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
        const data = await get_all_items(t, itemRepo);
        successmessage(res,"Get all the items successfully",data);
    });
};
