"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewController = void 0;
const createReview_usecase_1 = require("../../../application/useCases/item/createReview.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const createReviewController = (reviewRepo) => {
    return async (req, res) => reviewRepo.wrapTransaction(async (t) => {
        const { comment, item_id, rating } = req.body;
        const user_id = req.body.user.id;
        if (!user_id)
            throw new Error("Unauthorized");
        const data = await (0, createReview_usecase_1.createReview)(t, user_id, item_id, rating, comment, reviewRepo);
        (0, displaymessage_1.successmessage)(res, "Review posted successfully", data);
    });
};
exports.createReviewController = createReviewController;
