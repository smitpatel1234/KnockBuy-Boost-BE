import { EntityManager } from "typeorm"
import { AuthRepoPort } from "../../port/auth-repo.port"
import { email } from "zod"
export const  loginUserInGoogle = (entitiesmanager:EntityManager,AuthRepo:AuthRepoPort,user:any)=>{
    const  email =  user.emails[0].value
    AuthRepo.FindUser(entitiesmanager,{identifier:"",password:""}).then((user)=>{
        console.log("User found",user);
    }).catch((err)=>{
        console.log("Error finding user",err);
    })
}