import { EntityManager } from "typeorm";
import Express from "express";
import { create_variant_value } from "../../../application/useCases/variantvalue/index";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const createVariantValueController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
        const data = req.body;
         await create_variant_value(t, variantRepo, data);
        return successmessage(res, "Variant value created successfully");
    });
};
