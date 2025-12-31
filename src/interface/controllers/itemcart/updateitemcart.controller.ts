import { EntityManager } from "typeorm";
import Express from "express";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { update_itemcart  } from "../../../application/useCases/itemcart/index";
export const updateItemCartController = ( ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const data = req.body;
            const IsUpdated =  await update_itemcart(t, ItemCartRepo, data);
            if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");
          return successmessage(res, "address updated successfully");
      }
    });
};
