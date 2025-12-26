"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserController = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getAllUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const user = await UserAndCredentialsRepo.getallUser(t);
        if (!user) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "User Not Found");
        }
        return (0, displaymessage_1.successmessage)(res, "Get user successfully", user);
    });
};
exports.getAllUserController = getAllUserController;
