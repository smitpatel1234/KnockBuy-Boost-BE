// import { Request,Response } from 'express';
// import { EntityManager } from 'typeorm';
// import { AuthRepoPort } from '../../../application/port/auth-repo.port';
// import { displaymessage } from '../../../infrastructure/helper/displaymessage';
// import { loginUserInGoogle } from '../../../application/useCases/auth/google-login.usecase';
// export const  LoginUserInGoogleController =  (AuthRepo: AuthRepoPort)=>{
//     return async (req:Request,res:Response)=>{
//       AuthRepo.wrapTransaction(async(t:EntityManager)=>{
//          await loginUserInGoogle(t,AuthRepo,req.user);
//       })}
// }