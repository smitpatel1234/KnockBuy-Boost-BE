import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { AddDiscountModel, DiscountModel, GetDiscountModel } from "../../domain/models/discount.models";

export interface DiscountRepoPort {
    CreateDiscount: (em: EntityManager, data: AddDiscountModel) => Promise<boolean>;
    DeleteDiscount: (em: EntityManager, id: string) => Promise<boolean>;
    GetAllDiscounts: (em: EntityManager) => Promise<GetDiscountModel[]>;
    GetAllDiscountsPage: (em: EntityManager, data: pageParams) => Promise<PaginationResponse<GetDiscountModel>>;
    GetDiscountByCode: (em: EntityManager, code: string) => Promise<DiscountModel | null>;
    GetDiscountById: (em: EntityManager, id: string) => Promise<DiscountModel | null>;
    UpdateDiscount: (em: EntityManager, data: DiscountModel) => Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
