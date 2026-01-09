"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_from_wishlist = void 0;
const remove_from_wishlist = async (em, wishlistRepo, user_id, item_id) => {
    return await wishlistRepo.RemoveFromWishlist(em, user_id, item_id);
};
exports.remove_from_wishlist = remove_from_wishlist;
