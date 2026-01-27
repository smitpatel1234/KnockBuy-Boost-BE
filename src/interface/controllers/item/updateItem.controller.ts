import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { update_item } from "../../../application/useCases/item";
import { ItemModel } from "../../../domain/models/item.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const updateItemController = (itemRepo: ItemRepoPort) => {
  return async (req: AuthRequest<ItemModel>, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      const IsUpdated = await update_item(t, data, itemRepo);
      if (!IsUpdated)
        throw new ApplicationError(
          ApplicationErrorType.NOT_FOUND,
          "Item Not Found"
        );
      successmessage(res, "Item updated successfully");
    });
};
