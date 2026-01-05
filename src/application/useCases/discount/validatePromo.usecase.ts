import { EntityManager } from "typeorm";

import { DiscountModel } from "../../../domain/models/discount.models";
import { DiscountRepoPort } from "../../port/discount-repo.port";

export const validatePromo = async (
    em: EntityManager,
    code: string,
    discountRepo: DiscountRepoPort
): Promise<DiscountModel | null> => {
    const discount = await discountRepo.GetDiscountByCode(em, code);

    if (!discount || discount.active_flag === 0) {
        return null;
    }

    // You can add more complex rules here (expiry, usage limits, etc.)
    return discount;
};
