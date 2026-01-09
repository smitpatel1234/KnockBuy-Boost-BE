import Express from "express";
import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { get_itemcart } from "../../../application/useCases/itemcart/index";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { AuthRequest } from "../../types/request.types";

export const getItemCartController = (ItemCartRepo: ItemCartRepoPort) => {
  return async (req: AuthRequest, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {

        const user_id = req.body.user.id;
        const data = await get_itemcart(t, ItemCartRepo, user_id);
        successmessage(res, "Get all the cart item successfully", data); return;
      }

    });
};
