import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { validatePromo } from "../../../application/useCases/discount/validatePromo.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const validatePromoController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const { code } = req.body;
            if (!code) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Promo code is required");

            const discount = await validatePromo(t, code as string, discountRepo);
            if (!discount) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Invalid or inactive promo code");

            successmessage(res, "Promo code validated successfully", discount);
        });
};
