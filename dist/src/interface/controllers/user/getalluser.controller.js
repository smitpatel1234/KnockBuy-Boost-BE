"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAllUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const user = await UserAndCredentialsRepo.getallUser(t);
        (0, displaymessage_1.successmessage)(res, "Get user successfully", user);
    });
};
exports.getAllUserController = getAllUserController;
