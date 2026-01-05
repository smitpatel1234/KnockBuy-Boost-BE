import Express from "express";
import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import {
  get_item_by_id,
  get_item_by_slug,
} from "../../../application/useCases/item";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { logger } from "../../../infrastructure/helper/logger";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const getItemController = (
  itemRepo: ItemRepoPort,
  variantRepo: VariantRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const { id, slug } = req.params;
      if (slug) {
        const data = await get_item_by_slug(
          t,
          String(slug),
          itemRepo,
          variantRepo
        );
        if (!data)
          throw new ApplicationError(
            ApplicationErrorType.NOT_FOUND,
            "Item Not Found"
          );
        successmessage(res, "Get item successfully", data); return;
      } else if (id) {
        const data = await get_item_by_id(t, String(id), itemRepo, variantRepo);
        if (!data)
          throw new ApplicationError(
            ApplicationErrorType.NOT_FOUND,
            "Item Not Found"
          );

        successmessage(res, "Get item successfully", data); return;
      }

      throw new ApplicationError(
        ApplicationErrorType.NOT_FOUND,
        "Item Not Found"
      );
    });
};
