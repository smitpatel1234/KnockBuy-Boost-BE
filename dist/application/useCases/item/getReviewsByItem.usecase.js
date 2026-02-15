"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByItem = void 0;
const getReviewsByItem = async (em, itemId, page, limit, reviewRepo) => {
    const [reviewsData, averageRating] = await Promise.all([
        reviewRepo.getReviewsByItemId(em, itemId, page, limit),
        reviewRepo.calculateAverageRating(em, itemId),
    ]);
    return {
        averageRating,
        ...reviewsData,
    };
};
exports.getReviewsByItem = getReviewsByItem;
