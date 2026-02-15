import { Review } from "../../infrastructure/orm/entities/review";

export interface CheckEligibilityResponse {
    alreadyReviewed: boolean;
    isEligible: boolean;
}

export interface CreateReviewRequestBody {
    comment?: string;
    item_id: string;
    rating: number;
}

export interface ReviewListResponse {
    data: Review[];
    total: number;
}
