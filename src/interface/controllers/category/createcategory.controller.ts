import Express from "express";
import { EntityManager } from "typeorm";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { create_category } from "../../../application/useCases/category/index";
import { AddCategory } from "../../../domain/models/category.models";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { AuthRequest } from "../../types/request.types";

export const createCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: AuthRequest<AddCategory>, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const data = req.body;
        await create_category(t, data, CategoryRepo);
        successmessage(res, "Category created successfully"); return;
      }
    });
};
