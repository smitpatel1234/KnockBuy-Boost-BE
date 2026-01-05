import { error } from "console";
import Express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { th } from "zod/locales";

import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError ,ApplicationErrorType} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";


export const getUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Request, res: Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
        const userId = req.params.id;

        const user = await UserAndCredentialsRepo.getUser(t, userId);
        if (!user) {
            throw new  ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
        } 

        const { ...userWithoutPassword } = user;
        successmessage(res, "Get user successfully", userWithoutPassword);
    });
};
