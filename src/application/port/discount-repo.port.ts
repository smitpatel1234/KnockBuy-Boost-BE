import { EntityManager } from "typeorm";
import { AddDiscountModel, DiscountModel, GetDiscountModel } from "../../domain/models/discount.models";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";

export interface DiscountRepoPort {
    GetDiscountById: (em: EntityManager, id: string) => Promise<DiscountModel | null>;
    GetDiscountByCode: (em: EntityManager, code: string) => Promise<DiscountModel | null>;
    CreateDiscount: (em: EntityManager, data: AddDiscountModel) => Promise<boolean>;
    UpdateDiscount: (em: EntityManager, data: DiscountModel) => Promise<boolean>;
    DeleteDiscount: (em: EntityManager, id: string) => Promise<boolean>;
    GetAllDiscounts: (em: EntityManager) => Promise<GetDiscountModel[]>;
    GetAllDiscountsPage: (em: EntityManager, data: pageParams) => Promise<PaginationResponse<GetDiscountModel>>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
