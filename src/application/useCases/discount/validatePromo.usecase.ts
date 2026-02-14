import { EntityManager } from "typeorm";

import { DiscountModel } from "../../../domain/models/discount.models";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { DiscountRepoPort } from "../../port/discount-repo.port";



export const validatePromo = async (
    em: EntityManager,
    code: string,
    discountRepo: DiscountRepoPort,
    user_id: string,
): Promise<DiscountModel | null> => {
    const discount = await discountRepo.GetDiscountByCode(em, code);
    if (!discount || discount.active_flag === 0) {
        return null;
    }
    const alreadyApplied = await discountRepo.AlreadyApplied(em,  discount.discount_id, user_id);
    if (alreadyApplied) {
         throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "already applied promo code");;
    }
    return discount;
};
