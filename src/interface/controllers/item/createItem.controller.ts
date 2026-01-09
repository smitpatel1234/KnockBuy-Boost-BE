import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { create_item } from "../../../application/useCases/item";
import { AddItemModel } from "../../../domain/models/item.models"
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const createItemController = (itemRepo: ItemRepoPort) => {
  return async (req: AuthRequest<AddItemModel>, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      const IsCreated = await create_item(t, data, itemRepo);
      if (!IsCreated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Item Not Found");
      successmessage(res, "Item created successfully");
    });
};
