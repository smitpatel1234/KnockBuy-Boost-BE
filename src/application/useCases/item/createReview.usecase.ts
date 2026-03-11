import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../port/review-repo.port";

export const createReview = async (
    em: EntityManager,
    userId: string,
    itemId: string,
    rating: number,
    comment: string | undefined,
    reviewRepo: ReviewRepoPort
) => {
    // 1. Check eligibility
    const isEligible = await reviewRepo.isUserEligibleForReview(em, userId, itemId);
    if (!isEligible) {
        throw new Error("You must purchase and receive the item before reviewing.");
    }

    // 2. Check for existing review (Upsert Behavior)
    const existingReview = await reviewRepo.getReviewByUserAndItem(em, userId, itemId);

    // 3. Create or Update review
    const savedReview = await reviewRepo.createReview(em, {
        ...(existingReview ? { review_id: existingReview.review_id } : {}),
        comment,
        item_id: itemId,
        rating,
        user_id: userId,
    });

    return savedReview;
};
