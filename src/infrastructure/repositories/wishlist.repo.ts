import { EntityManager } from "typeorm";

import { WishlistRepoPort } from "../../application/port/wishlist-repo.port";
import { WishlistItem } from "../../domain/models/wishlist.model";
import { wrapTransaction } from "../helper/transaction";
import { Wishlist } from "../orm/entities/wishlist";

export const WishlistRepo: WishlistRepoPort = {
  AddToWishlist: async (em, user_id, item_id) => {
    const exists = await em.getRepository(Wishlist).count({
      where: {
        item: { item_id },
        user: { user_id },
      },
    });

    if (exists) return false;

    await em.getRepository(Wishlist).save({
      item: { item_id },
      user: { user_id },
    });

    return true;
  },

  GetUserWishlist: async (
    em: EntityManager,
    user_id: string
  ): Promise<WishlistItem[]> => {
    const wishlist = await em
      .getRepository(Wishlist)
      .createQueryBuilder("wishlist")
      .leftJoin("wishlist.item", "item")
      .leftJoin("item.category", "category")
      .select([
        "wishlist.wish_list_id AS wish_list_id",

        "item.item_id AS item_id",
        "item.item_name AS item_name",
        "item.item_price AS item_price",
        "item.stock AS stock",
        "item.description AS description",
        "item.slug AS slug",
        "item.sku AS sku",

        "category.category_id AS category_id",
        "category.category_name AS category_name",
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select("image.image_URL")
          .from("image", "image")
          .where("image.items_id = item.item_id")
          .limit(1);
      }, "image_url")
      .where("wishlist.user = :user_id", { user_id })
      .getRawMany<WishlistItem>();

    return wishlist;
  },

  IsItemInWishlist: async (em, user_id, item_id) => {
    const count = await em.getRepository(Wishlist).count({
      where: {
        item: { item_id },
        user: { user_id },
      },
    });

    return count > 0;
  },

  RemoveFromWishlist: async (em, user_id, item_id) => {
    const result = await em.getRepository(Wishlist).delete({
      item: { item_id },
      user: { user_id },
    });

    return (result.affected ?? 0) > 0;
  },

  wrapTransaction: wrapTransaction,
};
