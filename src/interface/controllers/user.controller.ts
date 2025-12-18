import Express from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../application/port/User-repo.port";
import { constants } from "../../infrastructure/config/constants";
import { displaymessage } from "../../infrastructure/helper/displaymessage";  
import {  update_user } from "../../application/useCases/user/update_user.usecase";
import { delete_User } from "../../application/useCases/user/delete-user.usecase";
import { UUID } from "crypto";
export const updateUserController = (UserAndCredentialsRepo: UserAndCredentialsRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
    const User = req.body;
    await update_user(t,UserAndCredentialsRepo,User).then((obj)=>{
       if(!obj){
        displaymessage(constants.Code.NOT_FOUND, res);
        return;
       }
        displaymessage(constants.Code.OK, res);
    }).catch((err)=>{
        
        displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
    });

  });
};
export const deleteUserController = (UserAndCredentialsRepo: UserAndCredentialsRepoPort) => {
    return async (req: Express.Request, res: Express.Response) =>UserAndCredentialsRepo.wrapTransaction(async (t: EntityManager) => {
      const userId = req.body.user_id as UUID;
        await delete_User(t,userId,UserAndCredentialsRepo).then((bool)=>{
           if(!bool){
            displaymessage(constants.Code.NOT_FOUND, res);
            return;
           }
            displaymessage(constants.Code.CREATED, res);
        }).catch((err)=>{
            
            displaymessage(constants.Code.NOT_FOUND, res,[err]);
        });
  
    });
  };
