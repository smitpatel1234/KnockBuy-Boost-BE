import Express from "express";
import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { registerUser } from "../../../application/useCases/auth/register.usecase";
import { UserCredentials } from "../../../domain/models/User.models";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { PublicRequest } from "../../types/request.types";

export const registerUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: PublicRequest<UserCredentials>, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const userCredentials = req.body;
      await registerUser(t, userCredentials, UserAndCredentialsRepo)
      successmessage(res, "User registered successfully");
    });
};
