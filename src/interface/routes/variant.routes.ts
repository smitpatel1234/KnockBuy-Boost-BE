import express from "express";

import {
  AddVarientPropertysSchema,
  AddVarientWithValuesSchema,
  ItemVariantValueMappingId,
  ItemVariantValueMappingSchema,
  VariantCollectionIdSchema,
  VarientPropertysID,
  VarientPropertysSchema,
  VarientValuesID,
  VarientWithValuesSchema,
} from "../../domain/schemas/variant/Variant";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { VariantRepo } from "../../infrastructure/repositories/variant.repo";
import { deleteVariantCollectionController } from "../controllers/variant-collection/deleteVariantCollection.controller";
import { createVariantPropController } from "../controllers/variantProperys/createvariantprop.controller";
import { deleteVariantPropController } from "../controllers/variantProperys/deletevariantprop.controller";
import { getAllVariantPropertiesController } from "../controllers/variantProperys/getallvariantprop.controller";
import { UpdateVariantPropController } from "../controllers/variantProperys/updatevariantprop.controller";
import {
  createVariantValueController,
  deleteVariantValueController,
  getAllVariantValuePageController,
  getAllVariantValuesController,
  updateVariantValueController,
} from "../controllers/variantValues/index";
const router = express.Router();

router.get(
  "/get-all-variant-properties",
  authVerification([]),
  getAllVariantPropertiesController(VariantRepo)
);
router.post(
  "/create-variant-property",
  authVerification([]),
  validateDetails(AddVarientPropertysSchema),
  createVariantPropController(VariantRepo)
);
router.put(
  "/update-variant-property",
  authVerification([]),
  validateDetails(VarientPropertysSchema),
  UpdateVariantPropController(VariantRepo)
);
router.delete(
  "/delete-variant-property",
  authVerification([]),
  validateDetails(VarientPropertysID),
  deleteVariantPropController(VariantRepo)
);

router.get(
  "/get-all-variant-values",
  authVerification([]),
  getAllVariantValuesController(VariantRepo)
);
router.post(
  "/create-variant-value",
  authVerification([]),
  validateDetails(AddVarientWithValuesSchema),
  createVariantValueController(VariantRepo)
);
router.put(
  "/update-variant-value",
  authVerification([]),
  validateDetails(VarientWithValuesSchema),
  updateVariantValueController(VariantRepo)
);
router.delete(
  "/delete-variant-value",
  authVerification([]),
  validateDetails(VarientValuesID),
  deleteVariantValueController(VariantRepo)
);

router.get(
  "/get-all-variant-values-page",
  authVerification([]),
  getAllVariantValuePageController(VariantRepo)
);

router.delete(
  "/delete-variant-collection",
  authVerification([]),
  validateDetails(VariantCollectionIdSchema),
  deleteVariantCollectionController(VariantRepo)
);

export default router;
