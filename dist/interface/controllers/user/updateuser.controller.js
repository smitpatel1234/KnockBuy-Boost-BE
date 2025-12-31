"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
const update_user_usecase_1 = require("../../../application/useCases/user/update_user.usecase");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const updateUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const User = req.body;
        console.log(User);
        const IsUpdated = await (0, update_user_usecase_1.update_user)(t, UserAndCredentialsRepo, User);
        if (!IsUpdated)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "User Not Found");
        return (0, displaymessage_1.successmessage)(res, "User updated successfully");
    });
};
exports.updateUserController = updateUserController;
