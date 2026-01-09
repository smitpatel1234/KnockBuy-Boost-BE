import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort}  from "../../../application/port/User-repo.port";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const delete_User = async (
  t: EntityManager,
  userId: string,
  userRepo: UserAndCredentialsRepoPort
): Promise<void> => {
    const user = await userRepo.getUser(t, userId);
    if (!user) {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND,'User not found');
    }
  await userRepo.deleteUser(t, userId);
}