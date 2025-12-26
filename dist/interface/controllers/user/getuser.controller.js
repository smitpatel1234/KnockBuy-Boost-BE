"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const getUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const userId = req.body.user.id;
        if (!userId) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
        }
        const user = await UserAndCredentialsRepo.getUser(t, userId);
        if (!user) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "User Not Found");
        }
        const { ...userWithoutPassword } = user;
        return (0, displaymessage_1.successmessage)(res, "Get user successfully", userWithoutPassword);
    });
};
exports.getUserController = getUserController;
