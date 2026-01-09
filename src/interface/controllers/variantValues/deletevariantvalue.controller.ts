import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { delete_variant_value } from "../../../application/useCases/variantvalue/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const deleteVariantValueController = (variantRepo: VariantRepoPort) => {
  return async (req: AuthRequest<{ variantValue_id: string }>, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const id = req.body.variantValue_id;
      const IsDeleted = await delete_variant_value(t, variantRepo, id);
      if (!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Variant Value Not Found");
      successmessage(res, "Variant value deleted successfully");
    });
};
