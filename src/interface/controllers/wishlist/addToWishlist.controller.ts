import Express from "express";
import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../../application/port/wishlist-repo.port";
import { add_to_wishlist } from "../../../application/useCases/wishlist/add_to_wishlist";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const addToWishlistController =
  (wishlistRepo: WishlistRepoPort) =>
  async (req: Express.Request, res: Express.Response) =>
    wishlistRepo.wrapTransaction(async (t: EntityManager) => {
      const data = await add_to_wishlist(
        t,
        wishlistRepo,
        req.body.user.id,
        req.body.item_id
      );

      successmessage(res, "Item added to wishlist", data);
    });
