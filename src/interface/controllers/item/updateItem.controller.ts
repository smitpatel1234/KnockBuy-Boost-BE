import { EntityManager } from "typeorm";
import Express from "express";
import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { update_item } from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationErrorType,
  ApplicationError,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const updateItemController = (itemRepo: ItemRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      const IsUpdated = await update_item(t, data, itemRepo);
      if (!IsUpdated)
        throw new ApplicationError(
          ApplicationErrorType.NOT_FOUND,
          "Item Not Found"
        );
      return successmessage(res, "Item updated successfully");
    });
};
