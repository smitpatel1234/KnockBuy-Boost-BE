import Express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { ApplicationError ,ApplicationErrorType} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { th } from "zod/locales";
import { error } from "console";
import { successmessage } from "../../../infrastructure/helper/displaymessage";


export const getUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Request, res: Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {

        const userId = req.body.user.id as string;
        if (!userId) {
           throw new  ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
        }
        const user = await UserAndCredentialsRepo.getUser(t, userId);
        if (!user) {
            throw new  ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
        } 

        const { ...userWithoutPassword } = user;
        return successmessage(res, "Get user successfully", userWithoutPassword);
    });
};
