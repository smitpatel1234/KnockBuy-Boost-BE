import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { update_discount } from "../../../application/useCases/discount";
import { DiscountModel } from "../../../domain/models/discount.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const updateDiscountController = (discountRepo: DiscountRepoPort) => {
    return async (req: AuthRequest<DiscountModel>, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const data = req.body;
            const IsUpdated = await update_discount(t, data, discountRepo);
            if (!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Discount Not Found");
            successmessage(res, "Discount updated successfully");
        });
};
