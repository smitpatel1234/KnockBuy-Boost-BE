"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_models_1 = require("../../domain/models/User.models");
const item_1 = require("../../domain/schemas/item");
const review_1 = require("../../domain/schemas/review");
const authvarification_1 = require("../../infrastructure/helper/middleware/authvarification");
const validator_1 = require("../../infrastructure/helper/validator");
const category_repo_1 = require("../../infrastructure/repositories/category.repo");
const item_repo_1 = require("../../infrastructure/repositories/item.repo");
const item_description_repo_1 = require("../../infrastructure/repositories/item_description.repo");
const review_repo_1 = require("../../infrastructure/repositories/review.repo");
const variant_repo_1 = require("../../infrastructure/repositories/variant.repo");
const item_2 = require("../controllers/item");
const checkEligibility_controller_1 = require("../controllers/rating/checkEligibility.controller");
const createReview_controller_1 = require("../controllers/rating/createReview.controller");
const getReviews_controller_1 = require("../controllers/rating/getReviews.controller");
const router = express_1.default.Router();
// Item Management
router.get('/get-all-items', (0, item_2.getAllItemsController)(item_repo_1.ItemRepo));
router.get('/get-item/:id', (0, item_2.getItemController)(item_repo_1.ItemRepo, variant_repo_1.VariantRepo, review_repo_1.ReviewRepo, item_description_repo_1.ItemDescriptionRepo));
router.get('/get-item/slug/:slug', (0, item_2.getItemController)(item_repo_1.ItemRepo, variant_repo_1.VariantRepo, review_repo_1.ReviewRepo, item_description_repo_1.ItemDescriptionRepo));
router.post('/create-item', (0, authvarification_1.authVerification)([]), (0, validator_1.validateDetails)(item_1.AddItemSchema), (0, item_2.createItemController)(item_repo_1.ItemRepo));
router.post('/get-all-items-page', (0, item_2.getAllItemsPageController)(item_repo_1.ItemRepo));
router.put('/update-item', (0, authvarification_1.authVerification)([]), (0, validator_1.validateDetails)(item_1.UpdateItemSchema), (0, item_2.updateItemController)(item_repo_1.ItemRepo));
router.delete('/delete-item', (0, authvarification_1.authVerification)([]), (0, validator_1.validateDetails)(item_1.ItemIdSchema), (0, item_2.deleteItemController)(item_repo_1.ItemRepo));
router.post('/public/get-all-items-page', (0, item_2.getAllItemsPageController)(item_repo_1.ItemRepo));
router.post('/public/search-items', (0, item_2.searchItemsController)(item_repo_1.ItemRepo));
router.get('/public/search-suggestions', (0, item_2.searchSuggestionsController)(item_repo_1.ItemRepo, category_repo_1.CategoryRepo));
// Detailed Description
router.post('/get-item/:itemId/description', (0, authvarification_1.authVerification)([]), (0, validator_1.validateDetails)(item_1.UpdateItemDescriptionSchema), (0, item_2.updateDescriptionController)(item_description_repo_1.ItemDescriptionRepo));
// Reviews & Ratings
router.post('/reviews', (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, validator_1.validateDetails)(review_1.CreateReviewSchema), (0, createReview_controller_1.createReviewController)(review_repo_1.ReviewRepo));
router.get('/get-item/:itemId/reviews', (0, getReviews_controller_1.getReviewsController)(review_repo_1.ReviewRepo));
router.get('/get-item/:itemId/review-eligibility', (0, authvarification_1.authVerification)([User_models_1.UserRole.USER]), (0, checkEligibility_controller_1.checkEligibilityController)(review_repo_1.ReviewRepo));
exports.default = router;
