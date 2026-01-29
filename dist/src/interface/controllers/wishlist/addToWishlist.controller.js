"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToWishlistController = void 0;
const add_to_wishlist_1 = require("../../../application/useCases/wishlist/add_to_wishlist");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const addToWishlistController = (wishlistRepo) => async (req, res) => wishlistRepo.wrapTransaction(async (t) => {
    const { user } = req.body;
    const { item_id: itemId } = req.body;
    const data = await (0, add_to_wishlist_1.add_to_wishlist)(t, wishlistRepo, user.id, itemId);
    (0, displaymessage_1.successmessage)(res, "Item added to wishlist", data);
});
exports.addToWishlistController = addToWishlistController;
