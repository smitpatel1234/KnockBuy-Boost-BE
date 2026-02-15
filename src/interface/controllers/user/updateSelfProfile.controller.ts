import Express from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { update_user } from "../../../application/useCases/user/update_user.usecase";
import { UserProfile } from "../../../domain/models/User.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const updateSelfProfileController = (
    UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
    return async (req: AuthRequest<UserProfile>, res: Express.Response) =>
        UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
            const { user, ...profileData } = req.body;

            if (!user.id) {
                throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
            }

            // Enforce the user ID from the token
            const selfProfile: UserProfile = {
                ...profileData,
                user_id: user.id
            };

            const IsUpdated = await update_user(t, UserAndCredentialsRepo, selfProfile);

            if (!IsUpdated) {
                throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
            }

            successmessage(res, "Profile updated successfully");
        });
};
