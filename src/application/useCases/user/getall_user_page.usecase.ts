import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../port/User-repo.port";
import { pageParams } from "../../../domain/globalTypes/commonFields";

export const getallUserPage = (userRepo: UserAndCredentialsRepoPort) => {
    return async (t: EntityManager, data: pageParams) => {
        return await userRepo.getallUserPage(t, data);
    };
};
