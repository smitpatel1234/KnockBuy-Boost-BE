import { EntityManager } from "typeorm";
import { ItemRepoPort } from "../../port/item-repo.port";
import { pageParams } from "../../../domain/globalTypes/commonFields";
export const get_all_items_page = async (
    em: EntityManager,
    data:pageParams ,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.GetAllItemsPage(em,data);
};
