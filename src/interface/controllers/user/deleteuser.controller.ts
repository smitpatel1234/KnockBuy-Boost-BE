import { EntityManager } from "typeorm";
import Express from "express";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { delete_User } from "../../../application/useCases/user/delete-user.usecase";
import { UUID } from "crypto";

export const deleteUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const userId = req.body.user_id as UUID;
      await delete_User(t, userId, UserAndCredentialsRepo);
    });
};
