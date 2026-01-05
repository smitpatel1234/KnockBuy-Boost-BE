import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { getall_variant_values } from "../../../application/useCases/variantvalue/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const getAllVariantValuesController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
        const data = await getall_variant_values(t, variantRepo);
        successmessage(res,"Get all the variant values successfully",data);
    });
};
