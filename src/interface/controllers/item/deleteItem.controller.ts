import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { delete_item } from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const deleteItemController = (itemRepo: ItemRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const { item_id } = req.body;
      const IsDeleted = await delete_item(t, item_id, itemRepo);
      if (!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, ("Item Not Found"));
      successmessage(res, "Item deleted successfully");
    });
};
