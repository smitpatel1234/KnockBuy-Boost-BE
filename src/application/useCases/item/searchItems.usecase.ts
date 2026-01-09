import { EntityManager } from "typeorm";

import { PaginationResponse, searchPageParams } from "../../../domain/globalTypes/commonFields";
import { GetItemModel } from "../../../domain/models/item.models";
import { ItemRepoPort } from "../../port/item-repo.port";

export const search_items = async (
    em: EntityManager,
    data: searchPageParams,
    itemRepo: ItemRepoPort
): Promise<PaginationResponse<GetItemModel>> => {

    return await itemRepo.searchItems(em, data);
};
