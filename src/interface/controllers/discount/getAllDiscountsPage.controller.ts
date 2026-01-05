import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { get_all_discounts_page } from "../../../application/useCases/discount";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";

export const getAllDiscountsPageController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);

            const discountsData = await get_all_discounts_page(t, params, discountRepo);

            successmessage(res, "Get all discounts page successfully", discountsData);
        });
};
