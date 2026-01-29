"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_to_wishlist = void 0;
const add_to_wishlist = async (em, wishlistRepo, user_id, item_id) => {
    return await wishlistRepo.AddToWishlist(em, user_id, item_id);
};
exports.add_to_wishlist = add_to_wishlist;
