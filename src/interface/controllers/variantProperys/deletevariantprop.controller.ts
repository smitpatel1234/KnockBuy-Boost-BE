import { EntityManager } from "typeorm";
import Express from "express";
import { delete_varient_property } from "../../../application/useCases/variant_prop/index";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const deleteVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {

        const data = req.body;
        const IsDeleted = await delete_varient_property(t, variantRepo, data);
       if(!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,("Variant Property Not Found"));
       return successmessage(res, "Variant property deleted successfully");
  
    });
};
