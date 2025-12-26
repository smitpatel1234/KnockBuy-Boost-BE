import { EntityManager } from "typeorm";
import Express from "express";
import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { create_category } from "../../../application/useCases/category/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'

export const createCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const data = req.body;
        await create_category(t, data, CategoryRepo);
        return successmessage(res, "Category created successfully");
      }
    });
};
