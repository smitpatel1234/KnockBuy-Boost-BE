import { Router } from "express";

import { UserRole } from "../../domain/models/User.models";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification"
import { WishlistRepo } from "../../infrastructure/repositories/wishlist.repo";
import {   addToWishlistController,
  getUserWishlistController,
  removeFromWishlistController,} from '../controllers/wishlist/index'

const router = Router();

router.get(
  "/get-wishlist",
  authVerification([UserRole.USER]),
  getUserWishlistController(WishlistRepo)
);

router.post(
  "/post-wishlist",
  authVerification([UserRole.USER]),
  addToWishlistController(WishlistRepo)
);

router.delete(
  "/remove-wishlist/:item_id",
  authVerification([UserRole.USER]),
  removeFromWishlistController(WishlistRepo)
);

export default router;
