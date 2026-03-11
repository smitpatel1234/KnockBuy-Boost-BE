import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../application/port/review-repo.port";
import { wrapTransaction } from "../helper/transaction";
import { Order } from "../orm/entities/order";
import { Review } from "../orm/entities/review";

export const ReviewRepo: ReviewRepoPort = {
    calculateAverageRating: async (em: EntityManager, itemId: string): Promise<number> => {
        const result = await em
            .createQueryBuilder(Review, "review")
            .select("AVG(review.rating)", "average")
            .where("review.item_id = :itemId", { itemId })
            .getRawOne<{ average: string }>();

        return result?.average ? parseFloat(result.average) : 0;
    },

    createReview: async (em: EntityManager, review: Partial<Review>): Promise<Review> => {
        const newReview = em.create(Review, review);
        return await em.save(Review, newReview);
    },

    deleteReview: async (em: EntityManager, reviewId: string): Promise<void> => {
        await em.delete(Review, { review_id: reviewId });
    },

    getReviewByUserAndItem: async (
        em: EntityManager,
        userId: string,
        itemId: string
    ): Promise<null | Review> => {
        return await em.findOne(Review, { where: { item_id: itemId, user_id: userId } });
    },

    getReviewsByItemId: async (
        em: EntityManager,
        itemId: string,
        page: number,
        limit: number
    ): Promise<{ data: Review[]; total: number }> => {
        const [data, total] = await em.findAndCount(Review, {
            order: { created_at: "DESC" },
            relations: ["user"],
            skip: (page - 1) * limit,
            take: limit,
            where: { item_id: itemId },
        });

        return { data, total };
    },

    isUserEligibleForReview: async (em: EntityManager, userId: string, itemId: string): Promise<boolean> => {
        const result = await em
            .createQueryBuilder(Order, "order")
            .innerJoin("order.order_items", "oi")
            .where("order.user_id = :userId", { userId })
            .andWhere("oi.item_id = :itemId", { itemId })
            .getOne();

        return !!result;
    },

    wrapTransaction: wrapTransaction,
};
