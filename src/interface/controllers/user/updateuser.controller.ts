import { EntityManager } from "typeorm";
import Express from "express";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { update_user } from "../../../application/useCases/user/update_user.usecase";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
export const updateUserController = (
  UserAndCredentialsRepo: UserAndCredentialsRepoPort
) => {
  return async (req: Express.Request, res: Express.Response) =>
    UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {

        const User = req.body;
        console.log(User);  
        const IsUpdated =await update_user(t, UserAndCredentialsRepo, User);
        if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"User Not Found");
        return successmessage(res, "User updated successfully");
  
 
      
    });
};
