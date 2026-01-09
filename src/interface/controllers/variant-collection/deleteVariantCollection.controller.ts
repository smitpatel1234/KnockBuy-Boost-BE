import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const deleteVariantCollectionController = (
  variantRepo: VariantRepoPort
) => {
  return async (req: AuthRequest<{ variant_collection_id: string }>, res: Express.Response) =>
    variantRepo.wrapTransaction(async (t: EntityManager) => {
      const variant_collection_id = req.body.variant_collection_id;
      await variantRepo.deleteVariantCollection(t, variant_collection_id);
      successmessage(res, "Variant collection mapping deleted successfully"); return;
    });
};
