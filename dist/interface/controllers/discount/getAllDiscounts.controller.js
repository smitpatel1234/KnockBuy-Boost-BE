"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiscountsController = void 0;
const discount_1 = require("../../../application/useCases/discount");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAllDiscountsController = (discountRepo) => {
    return async (req, res) => discountRepo.wrapTransaction(async (t) => {
        const discounts = await (0, discount_1.get_all_discounts)(t, discountRepo);
        (0, displaymessage_1.successmessage)(res, "Get all discounts successfully", discounts);
    });
};
exports.getAllDiscountsController = getAllDiscountsController;
