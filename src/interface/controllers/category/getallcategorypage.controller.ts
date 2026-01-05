import { Request, Response } from "express";
import { EntityManager } from "typeorm";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { getallCategoryPage } from "../../../application/useCases/category/getall_category_page.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";

export const getAllCategoryPageController = (categoryRepo: CategoryRepoPort) => {
    return async (req: Request, res: Response) =>
        categoryRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);
            const data = await getallCategoryPage(t, categoryRepo, params);
            successmessage(res, "Categories fetched successfully", data);
        });
};
