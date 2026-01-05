import { EntityManager } from "typeorm";

import { DiscountModel } from "../../../domain/models/discount.models";
import { DiscountRepoPort } from "../../port/discount-repo.port";

export const update_discount = async (
    em: EntityManager,
    discount: DiscountModel,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.UpdateDiscount(em, discount);
};
