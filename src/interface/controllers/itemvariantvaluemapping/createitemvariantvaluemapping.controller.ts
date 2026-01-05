import Express from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { createvariantvalue_item_mapping } from "../../../application/useCases/variantvalue_item_mapping/index";
import { ItemVariantValueMappingModel } from "../../../domain/models/Variant.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { VariantRepo } from "../../../infrastructure/repositories/variant.repo";
export const createItemVariantValueMapping_Controller = (
  VariantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    VariantRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body as ItemVariantValueMappingModel;
      await createvariantvalue_item_mapping(t, VariantRepo, data);
      successmessage(
        res,
        "Item variant value mapping created successfully"
      );
    });
};
