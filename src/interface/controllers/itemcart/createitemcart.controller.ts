import Express from "express";
import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { create_itemcart } from "../../../application/useCases/itemcart/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const createItemCartController = (ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    ItemCartRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const user_id = req.body.user.id as string;
        const itemcart = req.body;
        const data = {
          added_at: new Date(),
          item: itemcart.item,
          quantity: itemcart.quantity,
          user: user_id,
        };
        await create_itemcart(t, ItemCartRepo, data);
        successmessage(res, "add to cart successfully"); return;
      }
    });
};
