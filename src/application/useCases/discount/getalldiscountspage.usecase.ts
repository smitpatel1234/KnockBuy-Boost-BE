import { EntityManager } from "typeorm";

import { pageParams } from "../../../domain/globalTypes/commonFields";
import { DiscountRepoPort } from "../../port/discount-repo.port";

export const get_all_discounts_page = async (
    em: EntityManager,
    data: pageParams,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.GetAllDiscountsPage(em, data);
};
