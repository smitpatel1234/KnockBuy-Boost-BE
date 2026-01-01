import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import {
  VarientPropertysID,
  AddVarientWithValuesSchema,
  AddVarientPropertysSchema,
  ItemVariantValueMappingSchema,
  ItemVariantValueMappingId,
  AddVarientPropWithCollectionSchema,
  VarientPropertysSchema,
  VarientWithValuesSchema,
  VarientValuesID,
  VarientPropWithCollectionSchema,
  VariantCollectionIdSchema,
} from "../../domain/schemas/variant/Variant";

import { VariantRepo } from "../../infrastructure/repositories/variant.repo";

import { UpdateVariantPropController } from "../controllers/variantProperys/updatevariantprop.controller";
import { deleteVariantPropController } from "../controllers/variantProperys/deletevariantprop.controller";
import { getAllVariantPropertiesController } from "../controllers/variantProperys/getallvariantprop.controller";
import { createVariantPropController } from "../controllers/variantProperys/createvariantprop.controller";

import {
  createVariantValueController,
  updateVariantValueController,
  deleteVariantValueController,
  getAllVariantValuesController,
  getAllVariantValuePageController,
} from "../controllers/variantValues/index";
import { pageParamsSchema } from "../../domain/schemas/pagination";
import { createItemVariantValueMapping_Controller, deleteItemVariantValueMapping_Controller } from "../controllers/itemvariantvaluemapping/index";
import { deleteVariantCollectionController } from "../controllers/variant-collection/deleteVariantCollection.controller";
const router = express.Router();

router.get(
  "/get-all-variant-properties",
  authVerification(),
  getAllVariantPropertiesController(VariantRepo)
);
router.post(
  "/create-variant-property",
  authVerification(),
  validateDetails(AddVarientPropertysSchema),
  createVariantPropController(VariantRepo)
);
router.put(
  "/update-variant-property",
  authVerification(),
  validateDetails(VarientPropertysSchema),
  UpdateVariantPropController(VariantRepo)
);
router.delete(
  "/delete-variant-property",
  authVerification(),
  validateDetails(VarientPropertysID),
  deleteVariantPropController(VariantRepo)
);

router.get(
  "/get-all-variant-values",
  authVerification(),
  getAllVariantValuesController(VariantRepo)
);
router.post(
  "/create-variant-value",
  authVerification(),
  validateDetails(AddVarientWithValuesSchema),
  createVariantValueController(VariantRepo)
);
router.put(
  "/update-variant-value",
  authVerification(),
  validateDetails(VarientWithValuesSchema),
  updateVariantValueController(VariantRepo)
);
router.delete(
  "/delete-variant-value",
  authVerification(),
  validateDetails(VarientValuesID),
  deleteVariantValueController(VariantRepo)
);

router.post(
  "/create-item-variant-value-mapping",
  authVerification(),
  validateDetails(ItemVariantValueMappingSchema),
  createItemVariantValueMapping_Controller(VariantRepo)
);
router.delete(
  "/delete-item-variant-value-mapping",
  authVerification(),
  validateDetails(ItemVariantValueMappingId),
  deleteItemVariantValueMapping_Controller(VariantRepo)
);
router.get(
  "/get-all-variant-values-page",
  authVerification(),
  getAllVariantValuePageController(VariantRepo)
);

router.delete(
  "/delete-variant-collection",
  authVerification(),
  validateDetails(VariantCollectionIdSchema),
  deleteVariantCollectionController(VariantRepo)
);

export default router;
