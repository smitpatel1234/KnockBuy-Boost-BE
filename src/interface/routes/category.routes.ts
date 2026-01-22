import express from "express";

import { AddCategorySchema, DeleteCategorySchema, UpdateCategorySchema } from "../../domain/schemas/category";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { CategoryRepo } from "../../infrastructure/repositories/category.repo";
import { createCategoryController, deleteCategoryController, getALLCategoryController, getAllCategoryPageController, updateCategoryController } from "../controllers/category";
const router = express.Router();
router.get('/getAll-categories', getALLCategoryController(CategoryRepo));
router.post('/create-category', authVerification([]), validateDetails(AddCategorySchema), createCategoryController(CategoryRepo));
router.put('/update-category', authVerification([]), validateDetails(UpdateCategorySchema), updateCategoryController(CategoryRepo));
router.delete('/delete-category', authVerification([]), validateDetails(DeleteCategorySchema), deleteCategoryController(CategoryRepo));
router.post('/get-all-categories-page', authVerification([]), getAllCategoryPageController(CategoryRepo));
export default router;
