import express from "express";

import { UserRole } from "../../domain/models/User.models";
import { AddDiscountSchema, DiscountIdSchema, UpdateDiscountSchema, ValidatePromoSchema } from "../../domain/schemas/discount";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { DiscountRepo } from "../../infrastructure/repositories/discount.repo";
import {
    createDiscountController,
    deleteDiscountController,
    getAllDiscountsController,
    getAllDiscountsPageController,
    getDiscountController,
    updateDiscountController,
    validatePromoController
} from "../controllers/discount";

const router = express.Router();

router.post('/create-discount', authVerification([]), validateDetails(AddDiscountSchema), createDiscountController(DiscountRepo));
router.put('/update-discount', authVerification([]), validateDetails(UpdateDiscountSchema), updateDiscountController(DiscountRepo));
router.delete('/delete-discount', authVerification([]), validateDetails(DiscountIdSchema), deleteDiscountController(DiscountRepo));
router.get('/get-discount', authVerification([]), getDiscountController(DiscountRepo));
router.get('/get-all-discounts', authVerification([UserRole.USER]), getAllDiscountsController(DiscountRepo));
router.get('/get-all-discounts-page', authVerification([UserRole.USER]), getAllDiscountsPageController(DiscountRepo));
router.post('/validate-promo', authVerification([UserRole.USER]), validateDetails(ValidatePromoSchema), validatePromoController(DiscountRepo));

export default router;
