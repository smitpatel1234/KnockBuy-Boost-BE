import Express from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { delete_User } from "../../../application/useCases/user/delete-user.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const deleteUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: AuthRequest<{ user_id: string }>, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const userId = req.body.user_id;
      await delete_User(t, userId, UserAndCredentialsRepo);
      successmessage(res, "User deleted successfully");
    });
};
