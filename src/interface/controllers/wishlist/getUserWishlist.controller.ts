import Express from "express";
import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../../application/port/wishlist-repo.port";
import { get_user_wishlist } from "../../../application/useCases/wishlist/get_user_wishlist";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const getUserWishlistController =
  (wishlistRepo: WishlistRepoPort) =>
  async (req: AuthRequest, res: Express.Response) =>
    wishlistRepo.wrapTransaction(async (t: EntityManager) => {
      const { user } = req.body;
      const data = await get_user_wishlist(
        t,
        wishlistRepo,
        user.id
      );

      successmessage(res, "Wishlist fetched successfully", data);
    });
