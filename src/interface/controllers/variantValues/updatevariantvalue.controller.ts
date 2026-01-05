import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { update_variant_value } from "../../../application/useCases/variantvalue/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const updateVariantValueController = (variantRepo: VariantRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      const IsUpdate = await update_variant_value(t, variantRepo, data);
      if (!IsUpdate)
        throw new ApplicationError(
          ApplicationErrorType.NOT_FOUND,
          "Variant Value Not Found"
        );
      successmessage(res, "Variant value updated successfully");
    });
};
