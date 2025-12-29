"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiscountsPageController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const discount_1 = require("../../../application/useCases/discount");
const getAllDiscountsPageController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const discountsData = await (0, discount_1.get_all_discounts_page)(t, params, discountRepo);
        return (0, displaymessage_1.successmessage)(res, "Get all discounts page successfully", discountsData);
    });
};
exports.getAllDiscountsPageController = getAllDiscountsPageController;
