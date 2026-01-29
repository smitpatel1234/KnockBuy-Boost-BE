"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_User = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const delete_User = async (t, userId, userRepo) => {
    const user = await userRepo.getUser(t, userId);
    if (!user) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, 'User not found');
    }
    await userRepo.deleteUser(t, userId);
};
exports.delete_User = delete_User;
