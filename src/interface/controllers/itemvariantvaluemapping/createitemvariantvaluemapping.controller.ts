import { EntityManager } from "typeorm";
import Express from "express";
import { createvariantvalue_item_mapping } from "../../../application/useCases/variantvalue_item_mapping/index";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { VariantRepo } from "../../../infrastructure/repositories/variant.repo";
import { ItemVariantValueMappingModel } from "../../../domain/models/Variant.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const createItemVariantValueMapping_Controller = (
  VariantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    VariantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body as ItemVariantValueMappingModel;
      await createvariantvalue_item_mapping(t, VariantRepo, data);
      return successmessage(
        res,
        "Item variant value mapping created successfully"
      );
    });
};
