import Express from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { registerUser } from "../../../application/useCases/auth/register.usecase";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
export const registerUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
  UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
        const userCredentials = req.body;
        await registerUser(t, userCredentials, UserAndCredentialsRepo)
        return successmessage(res, "User registered successfully");
    });
};
