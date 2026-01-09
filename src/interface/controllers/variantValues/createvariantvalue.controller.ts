import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { create_variant_value } from "../../../application/useCases/variantvalue/index";
import { VariantValueModel } from "../../../domain/models/Variant.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const createVariantValueController = (variantRepo: VariantRepoPort) => {
  return async (req: AuthRequest<VariantValueModel>, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      await create_variant_value(t, variantRepo, data);
      successmessage(res, "Variant value created successfully");
    });
};
