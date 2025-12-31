import { EntityManager } from "typeorm";
import Express from "express";
import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { get_itemcart  } from "../../../application/useCases/itemcart/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { get } from "http";
export const getItemCartController = (ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const user_id = req.body.user.id as string;
          if(!user_id) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED,"Unauthorized User"); 
          const data = await get_itemcart(t, ItemCartRepo, user_id);
          return successmessage(res,"Get all the addess successfully",data);
      }

    });
};
