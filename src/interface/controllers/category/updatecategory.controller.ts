import Express from "express";
import { EntityManager } from "typeorm";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { update_category } from "../../../application/useCases/category/index";
import { CategoryType } from "../../../domain/models/category.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { AuthRequest } from "../../types/request.types";

export const updateCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: AuthRequest<CategoryType>, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const data = req.body;
        const IsUpdated = await update_category(t, CategoryRepo, data);
        if (!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Category Not Found");
        successmessage(res, "Category updated successfully"); return;
      }
    });
};
