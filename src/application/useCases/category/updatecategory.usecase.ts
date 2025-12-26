import { EntityManager } from "typeorm";
import { CategoryRepoPort } from "../../port/category-repo.port";
import { CategoryType } from "../../../domain/models/category.models";

export const update_category= async (
        EntityManager: EntityManager,
        CategoryRepo: CategoryRepoPort, 
        category: CategoryType
) => {
 return await CategoryRepo.updateCategory(EntityManager, category);
};