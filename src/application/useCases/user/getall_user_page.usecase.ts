import { EntityManager } from "typeorm";

import { pageParams } from "../../../domain/globalTypes/commonFields";
import { UserAndCredentialsRepoPort } from "../../port/User-repo.port";

export const getallUserPage = async (t: EntityManager, userRepo: UserAndCredentialsRepoPort, data: pageParams) => {
    return await userRepo.getallUserPage(t, data);
};
