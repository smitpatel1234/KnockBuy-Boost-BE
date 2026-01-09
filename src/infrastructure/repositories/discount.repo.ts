import { EntityManager } from "typeorm";

import { DiscountRepoPort } from "../../application/port/discount-repo.port";
import {
  pageParams,
  PaginationResponse,
} from "../../domain/globalTypes/commonFields";
import {
  AddDiscountModel,
  DiscountModel,
  GetDiscountModel,
} from "../../domain/models/discount.models";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { Discount } from "../orm/entities/discount";

export const DiscountRepo: DiscountRepoPort = {
  CreateDiscount: async (
    em: EntityManager,
    data: AddDiscountModel
  ): Promise<boolean> => {
    console.log(data);

    const discountRepo = em.getRepository(Discount);
    const newDiscount = discountRepo.create({
      active_flag: data.active_flag,
      description: data.description,
      discount_amount: data.discount_amount,
      discount_code: data.discount_code,
      discount_name: data.discount_name,
      discount_start_date: data.discount_start_date,
      discount_type: data.discount_type,
      duration: data.duration,
    });
    try {
      await discountRepo.save(newDiscount);
    } catch (error) {
      console.log(error);
    }
    return true;
  },

  DeleteDiscount: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.getRepository(Discount).delete(id);
    return (result.affected ?? 0) > 0;
  },

  GetAllDiscounts: async (em: EntityManager): Promise<GetDiscountModel[]> => {
    const discounts = await em
      .getRepository(Discount)
      .createQueryBuilder("discount")
      .select([
        "discount.discount_id AS discount_id",
        "discount.discount_name AS discount_name",
        "discount.discount_code AS discount_code",
        "discount.discount_type AS discount_type",
        "discount.discount_amount AS discount_amount",
        "discount.duration AS duration",
        "discount.description AS description",
        "discount.discount_start_date AS discount_start_date",
        "discount.active_flag AS active_flag",
      ])
      .getRawMany();
    return discounts as GetDiscountModel[];
  },

  GetAllDiscountsPage: async (
    em: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<GetDiscountModel>> => {
    const DiscountBuilder = em
      .getRepository(Discount)
      .createQueryBuilder("discount")
      .select([
        "discount.discount_id AS discount_id",
        "discount.discount_name AS discount_name",
        "discount.discount_code AS discount_code",
        "discount.discount_type AS discount_type",
        "discount.discount_amount AS discount_amount",
        "discount.duration AS duration",
        "discount.description AS description",
        "discount.discount_start_date AS discount_start_date",
        "discount.active_flag AS active_flag",
      ]);

    return applyPaginationAndFilters<Discount, GetDiscountModel>(DiscountBuilder, data);
  },

  GetDiscountByCode: async (
    em: EntityManager,
    code: string
  ): Promise<DiscountModel | null> => {
    const discount = await em.getRepository(Discount).findOne({
      where: { discount_code: code },
    });

    return discount as unknown as DiscountModel;
  },

  GetDiscountById: async (
    em: EntityManager,
    id: string
  ): Promise<DiscountModel | null> => {
    const discount = await em
      .getRepository(Discount)
      .createQueryBuilder("discount")
      .select([
        "discount.discount_id AS discount_id",
        "discount.discount_name AS discount_name",
        "discount.discount_code AS discount_code",
        "discount.discount_type AS discount_type",
        "discount.discount_amount AS discount_amount",
        "discount.duration AS duration",
        "discount.description AS description",
        "discount.discount_start_date AS discount_start_date",
        "discount.active_flag AS active_flag",
      ])
      .where("discount.discount_id = :id", { id })
      .getRawOne<DiscountModel>();

    return discount ?? null;
  },

  UpdateDiscount: async (
    em: EntityManager,
    data: DiscountModel
  ): Promise<boolean> => {
    const discountRepo = em.getRepository(Discount);
    const existing = await discountRepo.findOneBy({
      discount_id: data.discount_id,
    });
    if (!existing) return false;

    existing.discount_name = data.discount_name;
    existing.discount_code = data.discount_code;
    existing.discount_type = data.discount_type;
    existing.discount_amount = data.discount_amount;
    existing.duration = data.duration;
    existing.description = data.description;
    existing.discount_start_date = data.discount_start_date;
    existing.active_flag = data.active_flag;

    await discountRepo.save(existing);
    return true;
  },
  wrapTransaction: wrapTransaction,
};
