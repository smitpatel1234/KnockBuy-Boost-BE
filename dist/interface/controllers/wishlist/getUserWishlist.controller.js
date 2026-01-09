"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWishlistController = void 0;
const get_user_wishlist_1 = require("../../../application/useCases/wishlist/get_user_wishlist");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getUserWishlistController = (wishlistRepo) => async (req, res) => wishlistRepo.wrapTransaction(async (t) => {
    const data = await (0, get_user_wishlist_1.get_user_wishlist)(t, wishlistRepo, req.body.user.id);
    (0, displaymessage_1.successmessage)(res, "Wishlist fetched successfully", data);
});
exports.getUserWishlistController = getUserWishlistController;
