import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../port/discount-repo.port";

export const get_discount = async (
    em: EntityManager,
    id: string,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.GetDiscountById(em, id);
};
