import { EntityManager } from "typeorm";
import Express from "express";
import { CategoryRepoPort } from "../../../application/port/category-repo.port";
import { delete_category } from "../../../application/useCases/category/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";


export const deleteCategoryController = (CategoryRepo: CategoryRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    CategoryRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const category_id = req.body.category_id;
         const IsDeleted =  await delete_category(t, CategoryRepo, category_id);    
         if(!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"Category Not Found");``
          return successmessage(res, "Category deleted successfully");   
      }
    });
};
