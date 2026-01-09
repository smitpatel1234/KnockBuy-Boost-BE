import { EntityManager } from "typeorm";
import { WishlistItem } from "../../domain/models/wishlist.model";

export interface WishlistRepoPort {
  AddToWishlist: (
    em: EntityManager,
    user_id: string,
    item_id: string
  ) => Promise<boolean>;

  RemoveFromWishlist: (
    em: EntityManager,
    user_id: string,
    item_id: string
  ) => Promise<boolean>;

  GetUserWishlist: (
    em: EntityManager,
    user_id: string
  ) => Promise<WishlistItem[]>;

  IsItemInWishlist: (
    em: EntityManager,
    user_id: string,
    item_id: string
  ) => Promise<boolean>;

  wrapTransaction: <T>(
    fun: (t: EntityManager) => Promise<T>
  ) => Promise<T>;
}
