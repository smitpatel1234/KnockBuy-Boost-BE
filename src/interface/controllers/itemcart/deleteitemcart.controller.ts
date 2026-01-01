import { EntityManager } from "typeorm";
import Express from "express";
import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { delete_itemcart  } from "../../../application/useCases/itemcart/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";


export const deleteItemCartController = (ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const cart_item_id = req.body.cart_item_id;
         const IsDeleted =  await delete_itemcart(t, ItemCartRepo, {cart_item_id:cart_item_id} );    
         if(!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");``
          return successmessage(res, "addess deleted successfully");   
      }
    });
};
