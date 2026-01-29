"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserPageController = void 0;
const getall_user_page_usecase_1 = require("../../../application/useCases/user/getall_user_page.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const request_helper_1 = require("../../../infrastructure/helper/request.helper");
const getAllUserPageController = (userRepo) => {
    return async (req, res) => userRepo.wrapTransaction(async (t) => {
        const params = (0, request_helper_1.parsePaginationParams)(req);
        const data = await (0, getall_user_page_usecase_1.getallUserPage)(t, userRepo, params);
        (0, displaymessage_1.successmessage)(res, "Users fetched successfully", data);
    });
};
exports.getAllUserPageController = getAllUserPageController;
