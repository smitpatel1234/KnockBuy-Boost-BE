import Express from "express";
import { EntityManager } from "typeorm";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { delete_category } from "../../../application/useCases/category/index";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";


export const deleteCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: AuthRequest<{ category_id: string }>, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const category_id = req.body.category_id;
        const IsDeleted = await delete_category(t, CategoryRepo, category_id);
        if (!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Category Not Found");
        successmessage(res, "Category deleted successfully"); return;
      }
    });
};
