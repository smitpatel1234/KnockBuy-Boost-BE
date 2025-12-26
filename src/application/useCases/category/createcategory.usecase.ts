import { EntityManager } from "typeorm";
import { AddCategory } from "../../../domain/models/category.models";
import { CategoryRepoPort } from "../../port/category-repo.port";

export const create_category = async (
    em: EntityManager,
    category: AddCategory,
    CategoryRepo: CategoryRepoPort
) => {
      
    return await CategoryRepo.createCategory(em, category);
};