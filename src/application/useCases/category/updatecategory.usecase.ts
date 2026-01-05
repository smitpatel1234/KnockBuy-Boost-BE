import { EntityManager } from "typeorm";

import { CategoryType } from "../../../domain/models/category.models";
import { CategoryRepoPort } from "../../port/category-repo.port";

export const update_category= async (
        EntityManager: EntityManager,
        CategoryRepo: CategoryRepoPort, 
        category: CategoryType
) => {
 return await CategoryRepo.updateCategory(EntityManager, category);
};