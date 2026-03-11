import { EntityManager } from "typeorm";

import { Review } from "../../infrastructure/orm/entities/review";

export interface ReviewRepoPort {
    calculateAverageRating(em: EntityManager, itemId: string): Promise<number>;
    createReview(em: EntityManager, review: Partial<Review>): Promise<Review>;
    deleteReview(em: EntityManager, reviewId: string): Promise<void>;
    getReviewByUserAndItem(
        em: EntityManager,
        userId: string,
        itemId: string
    ): Promise<null | Review>;
    getReviewsByItemId(
        em: EntityManager,
        itemId: string,
        page: number,
        limit: number
    ): Promise<{ data: Review[]; total: number }>;
    isUserEligibleForReview(em: EntityManager, userId: string, itemId: string): Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
