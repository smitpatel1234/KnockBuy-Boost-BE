import { EntityManager } from "typeorm";

import { pageParams } from "../../../domain/globalTypes/commonFields";
import { CategoryRepoPort } from "../../port/category-repo.port";

export const getallCategoryPage = async (t: EntityManager, categoryRepo: CategoryRepoPort, data: pageParams) => {
    return await categoryRepo.GetAllCategoryPage(t, data);
};
