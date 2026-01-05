import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { UserProfile } from "../../../domain/models/User.models";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const update_user = async (entitiesmanager: EntityManager, userRepo: UserAndCredentialsRepoPort, userProfile: UserProfile): Promise<boolean> => {
    const { email, phone_number, profile_image, user_id, username, wishlist_name } = userProfile;
    const allowedProfile: UserProfile = { email, phone_number, profile_image, user_id, username, wishlist_name };

    const userCredentials = { email, phone_number, username };
    const existingUser = await userRepo.checkUserExists(entitiesmanager, userCredentials, user_id);
    const errors = [];

    if (existingUser.username === username) errors.push('Username already exists');
    if (existingUser.email === email) errors.push('Email already exists');
    if (existingUser.phone_number === phone_number) errors.push('Phone number already exists');

    if (errors.length > 0) {
        throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, errors.join(', '));
    }
    return await userRepo.updateUser(entitiesmanager, allowedProfile);
};