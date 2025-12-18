import Express from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { constants } from "../../../infrastructure/config/constants";
import { displaymessage } from "../../../infrastructure/helper/displaymessage";  
import { registerUser } from "../../../application/useCases/auth/register.usecase";
export const registerUserController = (UserAndCredentialsRepo: UserAndCredentialsRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
    const userCredentials = req.body;
    await registerUser(t,userCredentials, UserAndCredentialsRepo).then(()=>{
        displaymessage(constants.Code.CREATED, res);
    }).catch((err)=>{
        
        displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
    });

  });
};
