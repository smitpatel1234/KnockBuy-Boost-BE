"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlistController = void 0;
const remove_from_wishlist_1 = require("../../../application/useCases/wishlist/remove_from_wishlist");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const removeFromWishlistController = (wishlistRepo) => async (req, res) => wishlistRepo.wrapTransaction(async (t) => {
    const { user } = req.body;
    const data = await (0, remove_from_wishlist_1.remove_from_wishlist)(t, wishlistRepo, user.id, req.params.item_id);
    (0, displaymessage_1.successmessage)(res, "Item removed from wishlist", data);
});
exports.removeFromWishlistController = removeFromWishlistController;
