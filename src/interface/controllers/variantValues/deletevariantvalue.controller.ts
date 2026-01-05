import { UUID } from "crypto";
import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { delete_variant_value } from "../../../application/useCases/variantvalue/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const deleteVariantValueController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
        const id = req.body.variantValue_id as UUID;
         const IsDeleted = await delete_variant_value(t, variantRepo, id);
         if(!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,("Variant Value Not Found"));
         successmessage(res, "Variant value deleted successfully");
    });
};
