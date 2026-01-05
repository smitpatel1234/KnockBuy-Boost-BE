import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../port/discount-repo.port";

export const delete_discount = async (
    em: EntityManager,
    id: string,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.DeleteDiscount(em, id);
};
