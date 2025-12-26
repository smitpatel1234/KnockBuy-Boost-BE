import { EntityManager } from "typeorm";
import Express from "express";
import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { update_category } from "../../../application/useCases/category/index";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const updateCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const data = req.body;
            const IsUpdated =  await update_category(t, CategoryRepo, data);
            if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"Category Not Found");
          return successmessage(res, "Category updated successfully");
      }
    });
};
