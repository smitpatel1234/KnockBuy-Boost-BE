"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllOrdersPageController = void 0;
const getAllOrdersPage_usecase_1 = require("../../../application/useCases/order/getAllOrdersPage.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const GetAllOrdersPageController = (OrderRepo) => {
    return async (req, res) => OrderRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const data = await (0, getAllOrdersPage_usecase_1.getAllOrdersPage)(t, OrderRepo, params);
        (0, displaymessage_1.successmessage)(res, "Orders fetched successfully", data);
    });
};
exports.GetAllOrdersPageController = GetAllOrdersPageController;
