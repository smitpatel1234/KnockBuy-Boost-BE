import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../port/wishlist-repo.port";

export const get_user_wishlist = async (
  em: EntityManager,
  wishlistRepo: WishlistRepoPort,
  user_id: string
) => {
  return await wishlistRepo.GetUserWishlist(em, user_id);
};
