"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuser = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const getuser = async (t, userId, userRepo) => {
    const user = await userRepo.getUser(t, userId);
    if (!user) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, 'User not found');
    }
    return user;
};
exports.getuser = getuser;
