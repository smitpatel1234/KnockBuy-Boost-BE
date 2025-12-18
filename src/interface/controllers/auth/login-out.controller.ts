import Express from "express";
import { EntityManager } from "typeorm";
import { AuthRepoPort } from "../../../application/port/auth-repo.port";
import { LoginCredentials } from "../../../domain/models/Auth.models";
import { constants } from "../../../infrastructure/config/constants";
import { displaymessage } from "../../../infrastructure/helper/displaymessage";  
import { loginUser } from "../../../application/useCases/auth/login.usecase";
import { logoutUser } from "../../../application/useCases/auth/logout.usecase"; 
export const LoginUserController = (AuthRepo: AuthRepoPort) => {
  
  return async (req: Express.Request, res: Express.Response) =>AuthRepo.wrapTransaction(async (t: EntityManager) => {
    const credentials: LoginCredentials = req.body;
    await loginUser(t,credentials, AuthRepo).then((token)=>{
         res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'lax' });
        
        displaymessage(constants.Code.OK, res);
    }).catch((err)=>{
        
        displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
    });

  });

};
export const LogoutUserController = (AuthRepo: AuthRepoPort) => {
  
  return async (req: Express.Request, res: Express.Response) =>AuthRepo.wrapTransaction(async (t: EntityManager) => {
    
    await logoutUser(t,req.cookies.accessToken, AuthRepo).then((token)=>{
        res.clearCookie('accessToken');
        displaymessage(constants.Code.OK, res,["Logged out successfully"]);
    }).catch((err)=>{
        displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
    });

  });
  
};