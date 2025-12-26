import { EntityManager } from "typeorm";
import { CategoryRepoPort } from "../../port/category-repo.port";

export const delete_category = async (
    entityManager: EntityManager,
    CategoryRepo: CategoryRepoPort,
    category_id: string
) => {
    
  return  await CategoryRepo.deleteCategory(entityManager, category_id);
    
};