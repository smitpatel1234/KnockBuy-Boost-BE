import { EntityManager } from "typeorm";
import { CategoryRepoPort } from "../../port/category-repo.port";




export const getALL_category = async(
    EntityManager: EntityManager,
    CategoryRepo: CategoryRepoPort,        
) => {
      
    return await CategoryRepo.getAllCategories(EntityManager);
};