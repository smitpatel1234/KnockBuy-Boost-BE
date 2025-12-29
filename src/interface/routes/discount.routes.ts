import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { AddDiscountSchema, UpdateDiscountSchema, DiscountIdSchema } from "../../domain/schemas/discount";
import { DiscountRepo } from "../../infrastructure/repositories/discount.repo";
import {
    createDiscountController,
    updateDiscountController,
    deleteDiscountController,
    getDiscountController,
    getAllDiscountsController,
    getAllDiscountsPageController
} from "../controllers/discount";

const router = express.Router();

router.post('/create-discount', authVerification(), validateDetails(AddDiscountSchema), createDiscountController(DiscountRepo));
router.put('/update-discount', authVerification(), validateDetails(UpdateDiscountSchema), updateDiscountController(DiscountRepo));
router.delete('/delete-discount', authVerification(), validateDetails(DiscountIdSchema), deleteDiscountController(DiscountRepo));
router.get('/get-discount',  authVerification(),getDiscountController(DiscountRepo));
router.get('/get-all-discounts',  authVerification(),getAllDiscountsController(DiscountRepo));
router.get('/get-all-discounts-page', authVerification(), getAllDiscountsPageController(DiscountRepo));

export default router;
