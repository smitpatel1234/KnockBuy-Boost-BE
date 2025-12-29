import { EntityManager } from "typeorm";
import { CategoryRepoPort } from "../../port/category-repo.port";
import { pageParams } from "../../../domain/globalTypes/commonFields";

export const getallCategoryPage = (categoryRepo: CategoryRepoPort) => {
    return async (t: EntityManager, data: pageParams) => {
        return await categoryRepo.GetAllCategoryPage(t, data);
    };
};
