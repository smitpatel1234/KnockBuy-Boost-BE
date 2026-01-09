import Express from "express";
import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { create_discount } from "../../../application/useCases/discount";
import { AddDiscountModel } from "../../../domain/models/discount.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const createDiscountController = (discountRepo: DiscountRepoPort) => {
    return async (req: AuthRequest<AddDiscountModel>, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const data = req.body;
            const IsCreated = await create_discount(t, data, discountRepo);
            if (!IsCreated) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Discount Not Created");
            successmessage(res, "Discount created successfully");
        });
};
