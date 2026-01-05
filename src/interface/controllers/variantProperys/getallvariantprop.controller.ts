import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { getall_variant_properties } from "../../../application/useCases/variant_prop/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const getAllVariantPropertiesController = (
  variantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
        const data = await getall_variant_properties(t, variantRepo);
        successmessage(res,"Get all the variant properties successfully",data);
    });
};
