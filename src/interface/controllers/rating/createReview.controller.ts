import Express from "express";
import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../../application/port/review-repo.port";
import { createReview } from "../../../application/useCases/item/createReview.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";
import { CreateReviewRequestBody } from "../../types/review.types";

export const createReviewController = (reviewRepo: ReviewRepoPort) => {
    return async (req: AuthRequest<CreateReviewRequestBody>, res: Express.Response) =>
        reviewRepo.wrapTransaction(async (t: EntityManager) => {
            const { comment, item_id, rating } = req.body;
            const user_id = req.body.user.id;

            if (!user_id) throw new Error("Unauthorized");

            const data = await createReview(
                t,
                user_id,
                item_id,
                rating,
                comment,
                reviewRepo
            );

            successmessage(res, "Review posted successfully", data);
        });
};
