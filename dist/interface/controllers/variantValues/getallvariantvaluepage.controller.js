"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVariantValuePageController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const getallvariantValuePage_usecase_1 = require("../../../application/useCases/variantvalue/getallvariantValuePage.usecase");
const getAllVariantValuePageController = (variantRepo) => {
    return async (req, res) => variantRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const data = await (0, getallvariantValuePage_usecase_1.getallvariantValuePage)(t, variantRepo, params);
        return (0, displaymessage_1.successmessage)(res, "Variant values fetched successfully", data);
    });
};
exports.getAllVariantValuePageController = getAllVariantValuePageController;
