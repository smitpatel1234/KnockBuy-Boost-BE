import Express from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const getAllUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: AuthRequest, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const user = await UserAndCredentialsRepo.getallUser(t);
      successmessage(res, "Get user successfully", user);
    });
};
