import { EntityManager } from "typeorm";

import { UserProfile } from "../../../domain/models/User.models";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { UserAndCredentialsRepoPort}  from "../../port/User-repo.port";
export const getuser = async (
  t: EntityManager,
  userId: string,
  userRepo: UserAndCredentialsRepoPort
): Promise< UserProfile > => {
     
      const user =  await userRepo.getUser(t, userId);
      if(!user){
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND,'User not found');
      }
      return user;
}