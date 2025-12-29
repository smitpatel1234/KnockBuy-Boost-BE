import { EntityManager } from "typeorm";
import Express from "express";
import { DiscountRepoPort } from "../../../application/port/discount-repo.port";
import { delete_discount } from "../../../application/useCases/discount";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const deleteDiscountController = (discountRepo: DiscountRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>
        discountRepo.wrapTransaction(async (t: EntityManager) => {
            const { discount_id } = req.body;
            const IsDeleted = await delete_discount(t, discount_id, discountRepo);
            if (!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Discount Not Found");
            return successmessage(res, "Discount deleted successfully");
        });
};
