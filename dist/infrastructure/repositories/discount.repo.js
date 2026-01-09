"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountRepo = void 0;
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const discount_1 = require("../orm/entities/discount");
exports.DiscountRepo = {
    CreateDiscount: async (em, data) => {
        console.log(data);
        const discountRepo = em.getRepository(discount_1.Discount);
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
        }
        catch (error) {
            console.log(error);
        }
        return true;
    },
    DeleteDiscount: async (em, id) => {
        const result = await em.getRepository(discount_1.Discount).delete(id);
        return (result.affected ?? 0) > 0;
    },
    GetAllDiscounts: async (em) => {
        const discounts = await em
            .getRepository(discount_1.Discount)
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
        return discounts;
    },
    GetAllDiscountsPage: async (em, data) => {
        const DiscountBuilder = em
            .getRepository(discount_1.Discount)
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
        return (0, pagination_helper_1.applyPaginationAndFilters)(DiscountBuilder, data);
    },
    GetDiscountByCode: async (em, code) => {
        const discount = await em.getRepository(discount_1.Discount).findOne({
            where: { discount_code: code },
        });
        return discount;
    },
    GetDiscountById: async (em, id) => {
        const discount = await em
            .getRepository(discount_1.Discount)
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
            .getRawOne();
        return discount ?? null;
    },
    UpdateDiscount: async (em, data) => {
        const discountRepo = em.getRepository(discount_1.Discount);
        const existing = await discountRepo.findOneBy({
            discount_id: data.discount_id,
        });
        if (!existing)
            return false;
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
    wrapTransaction: transaction_1.wrapTransaction,
};
