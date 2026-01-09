import Express from "express";
import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../../application/port/wishlist-repo.port";
import { get_user_wishlist } from "../../../application/useCases/wishlist/get_user_wishlist";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const getUserWishlistController =
  (wishlistRepo: WishlistRepoPort) =>
  async (req: Express.Request, res: Express.Response) =>
    wishlistRepo.wrapTransaction(async (t: EntityManager) => {
      const data = await get_user_wishlist(
        t,
        wishlistRepo,
        req.body.user.id
      );

      successmessage(res, "Wishlist fetched successfully", data);
    });
