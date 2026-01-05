import { EntityManager } from "typeorm";

import { pageParams } from "../../../domain/globalTypes/commonFields";
import { ItemRepoPort } from "../../port/item-repo.port";
export const get_all_items_page = async (
    em: EntityManager,
    data:pageParams ,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.GetAllItemsPage(em,data);
};
