import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../port/wishlist-repo.port";

export const remove_from_wishlist = async (
  em: EntityManager,
  wishlistRepo: WishlistRepoPort,
  user_id: string,
  item_id: string
) => {
  return await wishlistRepo.RemoveFromWishlist(em, user_id, item_id);
};
