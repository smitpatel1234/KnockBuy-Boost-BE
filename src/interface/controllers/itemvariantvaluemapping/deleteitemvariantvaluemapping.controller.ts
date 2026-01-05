import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { deletevariantvalue_item_mapping } from "../../../application/useCases/variantvalue_item_mapping/index";

export const deleteItemVariantValueMapping_Controller = (
  VariantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    VariantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      await deletevariantvalue_item_mapping(t, VariantRepo, data);
    });
};
