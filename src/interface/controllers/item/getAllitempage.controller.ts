import { EntityManager } from "typeorm";
import Express from "express";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ItemRepoPort } from "../../../application/port/item-repo.port";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";
import { get_all_items_page } from "../../../application/useCases/item";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const getAllItemsPageController = (itemRepo: ItemRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    itemRepo.wrapTransaction(async (t: EntityManager) => {
      const params = parsePaginationParams(req);
      const itemsdata = await get_all_items_page(t, params, itemRepo);
      return successmessage(res, "Get all the items successfully", itemsdata);
    });
};
