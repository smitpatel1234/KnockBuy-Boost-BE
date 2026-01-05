import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../port/discount-repo.port";

export const get_all_discounts = async (
    em: EntityManager,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.GetAllDiscounts(em);
};
