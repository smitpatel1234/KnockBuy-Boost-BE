import { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { parsePaginationParams } from "../../../infrastructure/helper/request.helper";
import { getallCategoryPage } from "../../../application/useCases/category/getall_category_page.usecase";

export const getAllCategoryPageController = (categoryRepo: CategoryRepoPort) => {
    return async (req: Request, res: Response) =>
        categoryRepo.wrapTransaction(async (t: EntityManager) => {
            const params = parsePaginationParams(req);
            const data = await getallCategoryPage(categoryRepo)(t, params);
            return successmessage(res, "Categories fetched successfully", data);
        });
};
