"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSelfProfileController = void 0;
const update_user_usecase_1 = require("../../../application/useCases/user/update_user.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const updateSelfProfileController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const { user, ...profileData } = req.body;
        if (!user.id) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
        }
        // Enforce the user ID from the token
        const selfProfile = {
            ...profileData,
            user_id: user.id
        };
        const IsUpdated = await (0, update_user_usecase_1.update_user)(t, UserAndCredentialsRepo, selfProfile);
        if (!IsUpdated) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "User Not Found");
        }
        (0, displaymessage_1.successmessage)(res, "Profile updated successfully");
    });
};
exports.updateSelfProfileController = updateSelfProfileController;
