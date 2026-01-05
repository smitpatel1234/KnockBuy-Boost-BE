import express from "express";

import { UserRole } from "../../domain/models/User.models";
import {
  AddressIdSchema,
  AddressSchema,
  UpdateAddressSchema,
} from "../../domain/schemas/address";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { AddressRepo } from "../../infrastructure/repositories/address.repo";
import {
  createAddressController,
  deleteAddressController,
  getAddressController,
  getALLAddressController,
  getALLAddressControllerInParams,
  updateAddressController,
} from "../controllers/address";
const router = express.Router();
router.put(
  "/update-address",
  authVerification([UserRole.USER]),
  validateDetails(UpdateAddressSchema),
  updateAddressController(AddressRepo)
);
router.delete(
  "/delete-address",
  authVerification([UserRole.USER]),
  validateDetails(AddressIdSchema),
  deleteAddressController(AddressRepo)
);
router.get(
  "/get-address",
  authVerification([UserRole.USER]),
  validateDetails(AddressIdSchema),
  getAddressController(AddressRepo)
);

router.get(
  "/getall-address-for-user",
  authVerification([UserRole.USER]),
  getALLAddressController(AddressRepo)
);
router.get(
  "/getall-address-for-user/:id",
  authVerification([]),
  getALLAddressControllerInParams(AddressRepo)
);
router.post(
  "/create-address",
  authVerification([UserRole.USER]),
  validateDetails(AddressSchema),
  createAddressController(AddressRepo)
);

router.post(
  "/create-address/:id",
  authVerification([]),
  validateDetails(AddressSchema),
  createAddressController(AddressRepo)
);
export default router;
