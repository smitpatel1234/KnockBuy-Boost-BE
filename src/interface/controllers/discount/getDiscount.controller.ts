import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { get_discount } from "../../../application/useCases/discount";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const getDiscountController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const { id } = req.query;
            if (!id) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Discount ID is required");

            const discount = await get_discount(t, id as string, discountRepo);
            if (!discount) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Discount Not Found");

            successmessage(res, "Get discount successfully", discount);
        });
};
