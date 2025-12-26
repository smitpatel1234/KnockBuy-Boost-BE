import Express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { ApplicationError ,ApplicationErrorType} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { successmessage } from "../../../infrastructure/helper/displaymessage";


export const getAllUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Request, res: Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {

        const user = await UserAndCredentialsRepo.getallUser(t);
        if (!user) {
            throw new  ApplicationError(ApplicationErrorType.NOT_FOUND, "User Not Found");
        } 
        
        return successmessage(res, "Get user successfully", user);
    });
};
