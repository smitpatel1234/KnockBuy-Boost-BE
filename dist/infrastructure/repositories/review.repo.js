"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepo = void 0;
const transaction_1 = require("../helper/transaction");
const order_1 = require("../orm/entities/order");
const review_1 = require("../orm/entities/review");
exports.ReviewRepo = {
    calculateAverageRating: async (em, itemId) => {
        const result = await em
            .createQueryBuilder(review_1.Review, "review")
            .select("AVG(review.rating)", "average")
            .where("review.item_id = :itemId", { itemId })
            .getRawOne();
        return result?.average ? parseFloat(result.average) : 0;
    },
    createReview: async (em, review) => {
        const newReview = em.create(review_1.Review, review);
        return await em.save(review_1.Review, newReview);
    },
    deleteReview: async (em, reviewId) => {
        await em.delete(review_1.Review, { review_id: reviewId });
    },
    getReviewByUserAndItem: async (em, userId, itemId) => {
        return await em.findOne(review_1.Review, { where: { item_id: itemId, user_id: userId } });
    },
    getReviewsByItemId: async (em, itemId, page, limit) => {
        const [data, total] = await em.findAndCount(review_1.Review, {
            order: { created_at: "DESC" },
            relations: ["user"],
            skip: (page - 1) * limit,
            take: limit,
            where: { item_id: itemId },
        });
        return { data, total };
    },
    isUserEligibleForReview: async (em, userId, itemId) => {
        const result = await em
            .createQueryBuilder(order_1.Order, "order")
            .innerJoin("order.order_items", "oi")
            .where("order.user_id = :userId", { userId })
            .andWhere("oi.item_id = :itemId", { itemId })
            .getOne();
        return !!result;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
