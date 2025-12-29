import { EntityManager } from "typeorm";
import Express from "express";
import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { create_discount } from "../../../application/useCases/discount";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const createDiscountController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const data = req.body;
            console.log(data);
            const IsCreated = await create_discount(t, data, discountRepo);
            if (!IsCreated) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Discount Not Created");
            return successmessage(res, "Discount created successfully");
        });
};
