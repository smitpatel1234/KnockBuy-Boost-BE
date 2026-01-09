import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { delete_varient_property } from "../../../application/useCases/variant_prop/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const deleteVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (req: AuthRequest<{ variantProperty_id: string }>, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body.variantProperty_id;
      const IsDeleted = await delete_varient_property(t, variantRepo, data);
      if (!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Variant Property Not Found");
      successmessage(res, "Variant property deleted successfully");
    });
};
