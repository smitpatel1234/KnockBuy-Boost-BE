import Express from "express";
import { EntityManager } from "typeorm";

import { ItemDescriptionRepoPort } from "../../../application/port/item-description-repo.port";
import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { ReviewRepoPort } from "../../../application/port/review-repo.port";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import {
  get_item_by_id,
  get_item_by_slug,
} from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const getItemController = (
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort,
  reviewRepo: ReviewRepoPort,
  descRepo: ItemDescriptionRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const { id, slug } = req.params;

      if (slug) {
        const data = await get_item_by_slug(
          t,
          slug,
          itemRepo,
          variantRepo,
          descRepo,
          reviewRepo
        );
        if (!data)
          throw new ApplicationError(
            ApplicationErrorType.NOT_FOUND,
            "Item Not Found"
          );
        successmessage(res, "Get item successfully", data);
        return;
      } else if (id) {
        const data = await get_item_by_id(t, id, itemRepo, variantRepo, descRepo, reviewRepo);
        if (!data)
          throw new ApplicationError(
            ApplicationErrorType.NOT_FOUND,
            "Item Not Found"
          );

        successmessage(res, "Get item successfully", data);
        return;
      }

      throw new ApplicationError(
        ApplicationErrorType.NOT_FOUND,
        "Item Not Found"
      );
    });
};
