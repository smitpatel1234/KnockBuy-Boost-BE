import { Response } from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";


export const getUserProfileController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: AuthRequest, res: Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {

      const userId = req.body.user.id;
      if (!userId) {
        throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
      }
      const user = await UserAndCredentialsRepo.getUser(t, userId);
      if (!user) {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
      }

      const { ...userWithoutPassword } = user;
      successmessage(res, "Get user successfully", userWithoutPassword);
    });
};
