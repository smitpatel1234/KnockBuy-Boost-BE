import Express from "express";
import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../../application/port/wishlist-repo.port";
import { add_to_wishlist } from "../../../application/useCases/wishlist/add_to_wishlist";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

interface AddToWishlistBody {
  item_id: string;
}

export const addToWishlistController =
  (wishlistRepo: WishlistRepoPort) =>
  async (req: AuthRequest<AddToWishlistBody>, res: Express.Response) =>
    wishlistRepo.wrapTransaction(async (t: EntityManager) => {
      const { user } = req.body;
      const { item_id: itemId } = req.body;
      const data = await add_to_wishlist(
        t,
        wishlistRepo,
        user.id,
        itemId
      );

      successmessage(res, "Item added to wishlist", data);
    });
