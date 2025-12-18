import express from "express";
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator ";
import {
  AddVarientWithValuesSchema,
  AddVarientPropertysSchema,
  AddVarientPropWithCollectionSchema,
  VarientPropertysSchema,
  VarientWithValuesSchema,
  VarientPropWithCollectionSchema,
  
} from "../../domain/schemas/variant/Variant";

import {
  createVariantPropController,
  UpdateVariantPropController,
  deleteVariantPropController,
getAllVariantPropertiesController
} from "../controllers/varient/variantprop.controller";
import { VariantRepo } from "../../infrastructure/repositories/variant.repo";

    const router = express.Router();
    router.get('/get-all-variant-properties', authVerification() ,getAllVariantPropertiesController(VariantRepo) );
    router.post('/create-variant-property', authVerification() ,validateDetails(AddVarientPropertysSchema) ,createVariantPropController(VariantRepo) );
    router.put('/update-variant-property', authVerification() ,validateDetails(VarientPropertysSchema) ,UpdateVariantPropController(VariantRepo) );
    router.delete('/delete-variant-property', authVerification(),validateDetails(VarientPropertysSchema) ,deleteVariantPropController(VariantRepo) );
export default router;