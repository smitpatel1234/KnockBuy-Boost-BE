"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_user = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const update_user = async (entitiesmanager, userRepo, userProfile) => {
    const { user_id, username, email, phone_number, wishlist_name, profile_image } = userProfile;
    const allowedProfile = { user_id, username, email, phone_number, wishlist_name, profile_image };
    const userCredentials = { username, email, phone_number };
    const existingUser = await userRepo.checkUserExists(entitiesmanager, userCredentials, user_id);
    let errors = [];
    if (existingUser.username === username)
        errors.push('Username already exists');
    if (existingUser.email === email)
        errors.push('Email already exists');
    if (existingUser.phone_number === phone_number)
        errors.push('Phone number already exists');
    if (errors.length > 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, errors.join(', '));
    }
    return await userRepo.updateUser(entitiesmanager, allowedProfile);
};
exports.update_user = update_user;
