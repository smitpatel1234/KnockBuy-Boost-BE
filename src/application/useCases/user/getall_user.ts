import { EntityManager } from "typeorm";

import { UserAndCredentialsRepoPort } from "../../port/User-repo.port";

export const getallUser = (userRepo: UserAndCredentialsRepoPort) => {
    return async (t: EntityManager) => {
        return await userRepo.getallUser(t);
    };
};