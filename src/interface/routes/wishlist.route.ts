import { Router } from "express";
import { WishlistRepo } from "../../infrastructure/repositories/wishlist.repo";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification"

import {   getUserWishlistController,
  addToWishlistController,
  removeFromWishlistController,} from '../controllers/wishlist/index'
import { UserRole } from "../../domain/models/User.models";

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
