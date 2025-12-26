import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import {
  AddressSchema,
  AddressIdSchema,
  UpdateAddressSchema,
} from "../../domain/schemas/address";
import { AddressRepo } from "../../infrastructure/repositories/address.repo";
import {
  createAddressController,
  updateAddressController,
  deleteAddressController,
  getAddressController,
  getALLAddressController,
} from "../controllers/address";
const router = express.Router();
router.put(
  "/update-address",
  authVerification(),
  validateDetails(UpdateAddressSchema),
  createAddressController(AddressRepo)
);
router.delete(
  "/delete-address",
  authVerification(),
  validateDetails(AddressIdSchema),
  deleteAddressController(AddressRepo)
);
router.get(
  "/get-address",
  authVerification(),
  validateDetails(AddressIdSchema),
  getAddressController(AddressRepo)
);
router.get(
  "/getall-address-for-user",
  authVerification(),
  getALLAddressController(AddressRepo)
);
router.post(
  "/create-address",
  authVerification(),
  validateDetails(AddressSchema),
  createAddressController(AddressRepo)
);
export default router;
