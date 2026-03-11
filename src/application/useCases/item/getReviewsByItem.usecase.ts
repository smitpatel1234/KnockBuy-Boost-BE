import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../port/review-repo.port";

export const getReviewsByItem = async (
    em: EntityManager,
    itemId: string,
    page: number,
    limit: number,
    reviewRepo: ReviewRepoPort
) => {
    const [reviewsData, averageRating] = await Promise.all([
        reviewRepo.getReviewsByItemId(em, itemId, page, limit),
        reviewRepo.calculateAverageRating(em, itemId),
    ]);

    return {
        averageRating,
        ...reviewsData,
    };
};
