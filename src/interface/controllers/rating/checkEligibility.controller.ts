import Express from "express";
import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../../application/port/review-repo.port";
import { checkReviewEligibility } from "../../../application/useCases/item/checkEligibility.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";
import { CheckEligibilityResponse } from "../../types/review.types";

export const checkEligibilityController = (reviewRepo: ReviewRepoPort) => {
    return async (req: AuthRequest, res: Express.Response) =>
        reviewRepo.wrapTransaction(async (t: EntityManager) => {
            const { itemId } = req.params;
            const user_id = req.body.user.id;

            if (!user_id) throw new Error("Unauthorized");

            const data = (await checkReviewEligibility(
                t,
                user_id,
                itemId,
                reviewRepo
            )) as CheckEligibilityResponse;

            successmessage(res, "Eligibility checked", data);
        });
};
