import express from "express";

import { UserRole } from "../../domain/models/User.models";
import {
  ItemCartIdSchema,
  ItemCartSchema,
  UpdateItemCartSchema

} from "../../domain/schemas/itemcart";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { ItemCartRepo } from "../../infrastructure/repositories/itemcart.repo";
import {
  createItemCartController,
  deleteItemCartController,
  getItemCartController,
  updateItemCartController
} from "../controllers/itemcart/index";
const router = express.Router();
router.put(
  "/update-itemcart",
  authVerification([UserRole.USER]),
  validateDetails(UpdateItemCartSchema),
  updateItemCartController(ItemCartRepo)
);
router.delete(
  "/delete-itemcart",
  authVerification([UserRole.USER]),
  validateDetails(ItemCartIdSchema),
  deleteItemCartController(ItemCartRepo)
);
router.get(
  "/get-itemcart",
  authVerification([UserRole.USER]),
  getItemCartController(ItemCartRepo)
);
router.post(
  "/create-itemcart",
  authVerification([UserRole.USER]),
  validateDetails(ItemCartSchema),
  createItemCartController(ItemCartRepo)
);
export default router;
