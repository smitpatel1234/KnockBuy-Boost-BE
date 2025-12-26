import { EntityManager } from "typeorm";
import Express from "express";
import { getall_variant_values } from "../../../application/useCases/variantvalue/index";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const getAllVariantValuesController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
        const data = await getall_variant_values(t, variantRepo);
        return successmessage(res,"Get all the variant values successfully",data);
    });
};
