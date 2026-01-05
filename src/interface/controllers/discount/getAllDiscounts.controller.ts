import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { get_all_discounts } from "../../../application/useCases/discount";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const getAllDiscountsController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const discounts = await get_all_discounts(t, discountRepo);
            successmessage(res, "Get all discounts successfully", discounts);
        });
};
