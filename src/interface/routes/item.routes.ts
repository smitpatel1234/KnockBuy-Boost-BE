import express from "express";

import { UserRole } from "../../domain/models/User.models";
import { AddItemSchema, ItemIdSchema, UpdateItemDescriptionSchema, UpdateItemSchema } from "../../domain/schemas/item";
import { CreateReviewSchema } from "../../domain/schemas/review";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { CategoryRepo } from "../../infrastructure/repositories/category.repo";
import { ItemRepo } from "../../infrastructure/repositories/item.repo";
import { ItemDescriptionRepo } from "../../infrastructure/repositories/item_description.repo";
import { ReviewRepo } from "../../infrastructure/repositories/review.repo";
import { VariantRepo } from "../../infrastructure/repositories/variant.repo";
import {
    createItemController,
    deleteItemController,
    getAllItemsController,
    getAllItemsPageController,
    getItemController,
    searchItemsController,
    searchSuggestionsController,
    updateDescriptionController,
    updateItemController
} from "../controllers/item";
import { checkEligibilityController } from "../controllers/rating/checkEligibility.controller";
import { createReviewController } from "../controllers/rating/createReview.controller";
import { getReviewsController } from "../controllers/rating/getReviews.controller";
const router = express.Router();

// Item Management
router.get('/get-all-items', getAllItemsController(ItemRepo));
router.get('/get-item/:id', getItemController(ItemRepo, VariantRepo, ReviewRepo, ItemDescriptionRepo));
router.get('/get-item/slug/:slug', getItemController(ItemRepo, VariantRepo, ReviewRepo, ItemDescriptionRepo));
router.post('/create-item', authVerification([]), validateDetails(AddItemSchema), createItemController(ItemRepo));
router.post('/get-all-items-page', getAllItemsPageController(ItemRepo));
router.put('/update-item', authVerification([]), validateDetails(UpdateItemSchema), updateItemController(ItemRepo));
router.delete('/delete-item', authVerification([]), validateDetails(ItemIdSchema), deleteItemController(ItemRepo));
router.post('/public/get-all-items-page', getAllItemsPageController(ItemRepo));
router.post('/public/search-items', searchItemsController(ItemRepo));
router.get('/public/search-suggestions', searchSuggestionsController(ItemRepo, CategoryRepo));

// Detailed Description
router.post('/get-item/:itemId/description', authVerification([]), validateDetails(UpdateItemDescriptionSchema), updateDescriptionController(ItemDescriptionRepo));

// Reviews & Ratings
router.post('/reviews', authVerification([UserRole.USER]), validateDetails(CreateReviewSchema), createReviewController(ReviewRepo));
router.get('/get-item/:itemId/reviews', getReviewsController(ReviewRepo));
router.get('/get-item/:itemId/review-eligibility', authVerification([UserRole.USER]), checkEligibilityController(ReviewRepo));

export default router;