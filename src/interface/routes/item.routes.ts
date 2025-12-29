import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { AddItemSchema, UpdateItemSchema, ItemIdSchema } from "../../domain/schemas/item";
import { ItemRepo } from "../../infrastructure/repositories/item.repo";
import { VariantRepo } from "../../infrastructure/repositories/variant.repo";
import {
    createItemController,
    updateItemController,
    deleteItemController,
    getItemController,
    getAllItemsController,
    getAllItemsPageController
} from "../controllers/item";

const router = express.Router();

router.post('/create-item', authVerification(), validateDetails(AddItemSchema), createItemController(ItemRepo));
router.put('/update-item', authVerification(), validateDetails(UpdateItemSchema), updateItemController(ItemRepo));
router.delete('/delete-item', authVerification(), validateDetails(ItemIdSchema), deleteItemController(ItemRepo));
router.get('/get-item/:id', getItemController(ItemRepo, VariantRepo));
router.get('/get-item/slug/:slug', getItemController(ItemRepo, VariantRepo));
router.get('/get-all-items', getAllItemsController(ItemRepo));
router.get('/get-all-items-page', getAllItemsPageController(ItemRepo)); // Made public as per plan
router.get('/public/get-all-items-page', getAllItemsPageController(ItemRepo)); // Explicit public route


export default router;