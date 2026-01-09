import Express from "express";
import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { create_itemcart } from "../../../application/useCases/itemcart/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const createItemCartController = (ItemCartRepo: ItemCartRepoPort) => {
  return async (req: AuthRequest<{ item: string; quantity: number }>, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const user_id = req.body.user.id;
        const { item, quantity } = req.body;
        const data = {
          item: item,
          quantity: quantity,
          user: user_id,
        };
        await create_itemcart(t, ItemCartRepo, data);
        successmessage(res, "add to cart successfully"); return;
      }
    });
};
