import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { create_varient_property } from "../../../application/useCases/variant_prop/index";
import { VariantPropertyModel } from "../../../domain/models/Variant.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const createVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (req: AuthRequest<VariantPropertyModel>, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      await create_varient_property(t, variantRepo, data);
      successmessage(res, "Variant property created successfully");

    });
};
