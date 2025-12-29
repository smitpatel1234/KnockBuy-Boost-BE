import { EntityManager } from "typeorm";
import Express from "express";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";
import { get_all_discounts_page } from "../../../application/useCases/discount";

export const getAllDiscountsPageController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);

            const discountsData = await get_all_discounts_page(t, params, discountRepo);

            return successmessage(res, "Get all discounts page successfully", discountsData);
        });
};
