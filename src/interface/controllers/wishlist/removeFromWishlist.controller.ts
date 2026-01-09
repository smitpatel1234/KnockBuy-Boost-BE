import Express from "express";
import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../../application/port/wishlist-repo.port";
import { remove_from_wishlist } from "../../../application/useCases/wishlist/remove_from_wishlist";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const removeFromWishlistController =
  (wishlistRepo: WishlistRepoPort) =>
  async (req: Express.Request, res: Express.Response) =>
    wishlistRepo.wrapTransaction(async (t: EntityManager) => {
      const data = await remove_from_wishlist(
        t,
        wishlistRepo,
        req.body.user.id,
        req.params.item_id
      );

      successmessage(res, "Item removed from wishlist", data);
    });
