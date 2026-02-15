import Express from "express";
import { EntityManager } from "typeorm";

import { ReviewRepoPort } from "../../../application/port/review-repo.port";
import { getReviewsByItem } from "../../../application/useCases/item/getReviewsByItem.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ReviewListResponse } from "../../types/review.types";

export const getReviewsController = (reviewRepo: ReviewRepoPort) => {
    return async (req: Express.Request, res: Express.Response) => {
        const { itemId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        await reviewRepo.wrapTransaction(async (t: EntityManager) => {
            const data = (await getReviewsByItem(
                t,
                itemId,
                page,
                limit,
                reviewRepo
            )) as ReviewListResponse;

            successmessage(res, "Reviews fetched successfully", data);
        });
    };
};
