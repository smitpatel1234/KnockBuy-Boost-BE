"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReviewEligibility = void 0;
const checkReviewEligibility = async (em, userId, itemId, reviewRepo) => {
    const isEligibleCheck = await reviewRepo.isUserEligibleForReview(em, userId, itemId);
    const existingReview = await reviewRepo.getReviewByUserAndItem(em, userId, itemId);
    const alreadyReviewed = !!existingReview;
    const isEligible = isEligibleCheck && !existingReview;
    return {
        alreadyReviewed,
        isEligible,
    };
};
exports.checkReviewEligibility = checkReviewEligibility;
