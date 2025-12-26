import { EntityManager } from "typeorm";
import { AddCategory, CategoryType, CategoryAllType } from "../../domain/models/category.models"


export interface CategoryRepoPort {
    createCategory: (em: EntityManager, category: AddCategory) => Promise<void>;
    updateCategory: (em: EntityManager, category: CategoryType) => Promise<boolean>;
    deleteCategory: (em: EntityManager, category_id: string) => Promise<boolean>;
    getAllCategories: (em: EntityManager) => Promise<CategoryAllType[]>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;

}   