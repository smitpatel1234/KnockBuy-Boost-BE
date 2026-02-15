"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEligibilityController = void 0;
const checkEligibility_usecase_1 = require("../../../application/useCases/item/checkEligibility.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const checkEligibilityController = (reviewRepo) => {
    return async (req, res) => reviewRepo.wrapTransaction(async (t) => {
        const { itemId } = req.params;
        const user_id = req.body.user.id;
        if (!user_id)
            throw new Error("Unauthorized");
        const data = (await (0, checkEligibility_usecase_1.checkReviewEligibility)(t, user_id, itemId, reviewRepo));
        (0, displaymessage_1.successmessage)(res, "Eligibility checked", data);
    });
};
exports.checkEligibilityController = checkEligibilityController;
