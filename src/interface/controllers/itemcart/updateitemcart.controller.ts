import Express from "express";
import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { update_itemcart  } from "../../../application/useCases/itemcart/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const updateItemCartController = ( ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const data = req.body;
            const IsUpdated =  await update_itemcart(t, ItemCartRepo, data);
            if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");
          successmessage(res, "address updated successfully"); return;
      }
    });
};
