import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const deleteVariantCollectionController = (
  variantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const { variant_collection_id } = req.body;
      try {
        await variantRepo.deleteVariantCollection(t, variant_collection_id);
        successmessage(res, "Variant collection mapping deleted successfully"); return;
      } catch (err) {
        throw new ApplicationError(
          ApplicationErrorType.BAD_REQUEST,
          "Failed to delete variant collection mapping"
        );
      }
    });
};
