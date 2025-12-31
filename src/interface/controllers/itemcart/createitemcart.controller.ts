import { EntityManager } from "typeorm";
import Express from "express";
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
          item: itemcart.item,
          user: user_id,
          quantity: itemcart.quantity,
          added_at: new Date(),
        };
        console.log(data);
        await create_itemcart(t, ItemCartRepo, data);
        return successmessage(res, "add to cart successfully");
      }
    });
};
