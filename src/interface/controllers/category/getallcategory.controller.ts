import Express from "express";
import { EntityManager } from "typeorm";

import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { getALL_category } from "../../../application/useCases/category/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'

export const getALLCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const data = await getALL_category(t, CategoryRepo);
          successmessage(res,"Get all the categories successfully",data); return;
      }

    });
};
