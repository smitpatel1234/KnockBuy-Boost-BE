import express from "express";

import { AddItemSchema, ItemIdSchema, UpdateItemSchema } from "../../domain/schemas/item";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { ItemRepo } from "../../infrastructure/repositories/item.repo";
import { VariantRepo } from "../../infrastructure/repositories/variant.repo";
import {
    createItemController,
    deleteItemController,
    getAllItemsController,
    getAllItemsPageController,
    getItemController,
    searchItemsController,
    updateItemController
} from "../controllers/item";

const router = express.Router();

router.post('/create-item', authVerification([]), validateDetails(AddItemSchema), createItemController(ItemRepo));
router.put('/update-item', authVerification([]), validateDetails(UpdateItemSchema), updateItemController(ItemRepo));
router.delete('/delete-item', authVerification([]), validateDetails(ItemIdSchema), deleteItemController(ItemRepo));
router.get('/get-item/:id', getItemController(ItemRepo, VariantRepo));
router.get('/get-item/slug/:slug', getItemController(ItemRepo, VariantRepo));
router.get('/get-all-items', getAllItemsController(ItemRepo));
router.get('/get-all-items-page', getAllItemsPageController(ItemRepo));
router.get('/public/get-all-items-page', getAllItemsPageController(ItemRepo));
router.get('/public/search-items', searchItemsController(ItemRepo));


export default router;