import { EntityManager } from "typeorm";
import Express from "express";
import { deletevariantvalue_item_mapping } from "../../../application/useCases/variantvalue_item_mapping/index";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";

export const deleteItemVariantValueMapping_Controller = (
  VariantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    VariantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body;
      await deletevariantvalue_item_mapping(t, VariantRepo, data);
    });
};
