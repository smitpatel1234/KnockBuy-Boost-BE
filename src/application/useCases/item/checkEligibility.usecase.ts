import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../port/review-repo.port";

export const checkReviewEligibility = async (
    em: EntityManager,
    userId: string,
    itemId: string,
    reviewRepo: ReviewRepoPort
) => {
    const isEligibleCheck = await reviewRepo.isUserEligibleForReview(em, userId, itemId);
    const existingReview = await reviewRepo.getReviewByUserAndItem(em, userId, itemId);

    const alreadyReviewed = !!existingReview;
    const isEligible = isEligibleCheck && !existingReview;

    return {
        alreadyReviewed,
        isEligible,
    };
};
