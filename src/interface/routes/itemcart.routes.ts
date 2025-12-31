import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import {
    ItemCartIdSchema,
    ItemCartSchema,
    UpdateItemCartSchema

} from "../../domain/schemas/itemcart";
import { ItemCartRepo } from "../../infrastructure/repositories/itemcart.repo";
import {
   getItemCartController,
  updateItemCartController,
  deleteItemCartController,
  createItemCartController
} from "../controllers/itemcart/index";
const router = express.Router();
router.put(
  "/update-itemcart",
  authVerification(),
  validateDetails(UpdateItemCartSchema),
  updateItemCartController(ItemCartRepo)
);
router.delete(
  "/delete-itemcart",
  authVerification(),
  validateDetails(ItemCartIdSchema),
  deleteItemCartController(ItemCartRepo)
);
router.get(
  "/get-itemcart",
  authVerification(),
  getItemCartController(ItemCartRepo)
);
router.post(
  "/create-itemcart",
  authVerification(),
  validateDetails(ItemCartSchema),
  createItemCartController(ItemCartRepo)
);
export default router;
