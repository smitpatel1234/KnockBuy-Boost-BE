"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepo = void 0;
const transaction_1 = require("../helper/transaction");
const wishlist_1 = require("../orm/entities/wishlist");
exports.WishlistRepo = {
    AddToWishlist: async (em, user_id, item_id) => {
        const exists = await em.getRepository(wishlist_1.Wishlist).count({
            where: {
                user: { user_id },
                item: { item_id },
            },
        });
        if (exists)
            return false;
        await em.getRepository(wishlist_1.Wishlist).save({
            user: { user_id },
            item: { item_id },
        });
        return true;
    },
    RemoveFromWishlist: async (em, user_id, item_id) => {
        const result = await em.getRepository(wishlist_1.Wishlist).delete({
            user: { user_id },
            item: { item_id },
        });
        return (result.affected ?? 0) > 0;
    },
    GetUserWishlist: async (em, user_id) => {
        const wishlist = await em
            .getRepository(wishlist_1.Wishlist)
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
            "item.rating AS rating",
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
            .getRawMany();
        return wishlist;
    },
    IsItemInWishlist: async (em, user_id, item_id) => {
        const count = await em.getRepository(wishlist_1.Wishlist).count({
            where: {
                user: { user_id },
                item: { item_id },
            },
        });
        return count > 0;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
