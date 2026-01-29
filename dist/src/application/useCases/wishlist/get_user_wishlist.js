"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user_wishlist = void 0;
const get_user_wishlist = async (em, wishlistRepo, user_id) => {
    return await wishlistRepo.GetUserWishlist(em, user_id);
};
exports.get_user_wishlist = get_user_wishlist;
