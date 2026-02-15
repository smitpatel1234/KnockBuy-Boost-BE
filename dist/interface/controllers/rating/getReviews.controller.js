"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsController = void 0;
const getReviewsByItem_usecase_1 = require("../../../application/useCases/item/getReviewsByItem.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getReviewsController = (reviewRepo) => {
    return async (req, res) => {
        const { itemId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        await reviewRepo.wrapTransaction(async (t) => {
            const data = (await (0, getReviewsByItem_usecase_1.getReviewsByItem)(t, itemId, page, limit, reviewRepo));
            (0, displaymessage_1.successmessage)(res, "Reviews fetched successfully", data);
        });
    };
};
exports.getReviewsController = getReviewsController;
