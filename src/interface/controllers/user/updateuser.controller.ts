import Express from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { update_user } from "../../../application/useCases/user/update_user.usecase";
import { UserProfile } from "../../../domain/models/User.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const updateUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: AuthRequest<UserProfile>, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const User = req.body;
      const IsUpdated = await update_user(t, UserAndCredentialsRepo, User);
      if (!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
      successmessage(res, "User updated successfully");



    });
};
