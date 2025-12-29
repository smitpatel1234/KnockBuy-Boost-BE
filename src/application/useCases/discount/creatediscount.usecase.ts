import { EntityManager } from "typeorm";
import { AddDiscountModel } from "../../../domain/models/discount.models";
import { DiscountRepoPort } from "../../port/discount-repo.port";

export const create_discount = async (
    em: EntityManager,
    discount: AddDiscountModel,
    discountRepo: DiscountRepoPort
) => {
    return await discountRepo.CreateDiscount(em, discount);
};
