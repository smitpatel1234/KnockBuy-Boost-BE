import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort}  from "../../../application/port/User-repo.port";
import { UUID } from "crypto";
export const delete_User = async (
  t: EntityManager,
  userId: UUID,
  userRepo: UserAndCredentialsRepoPort
): Promise<boolean | void > => {
    const user = await userRepo.getUser(t, userId);
    if (!user) {
        throw new Error('User not found');
    }
  await userRepo.deleteUser(t, userId);
}