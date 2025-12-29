import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort } from "../../../application/port/User-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";
import { getallUserPage } from "../../../application/useCases/user/getall_user_page.usecase";

export const getAllUserPageController = (userRepo: UserAndCredentialsRepoPort) => {
    return async (req: Request, res: Response) =>
        userRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);
            const data = await getallUserPage(userRepo)(t, params);
            return successmessage(res, "Users fetched successfully", data);
        });
};
