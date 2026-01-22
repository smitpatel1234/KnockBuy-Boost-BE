import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { AddCategory, CategoryAllType, CategoryType } from "../../domain/models/category.models";

export interface CategoryRepoPort {
    createCategory: (em: EntityManager, category: AddCategory) => Promise<void>;
    deleteCategory: (em: EntityManager, category_id: string) => Promise<boolean>;
    getAllCategories: (em: EntityManager) => Promise<CategoryAllType[]>;
    GetAllCategoryPage: (em: EntityManager, data: pageParams) => Promise<PaginationResponse<CategoryAllType>>;
    updateCategory: (em: EntityManager, category: CategoryType) => Promise<boolean>;
    searchCategoriesByName: (em: EntityManager, query: string) => Promise<CategoryAllType[]>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}   