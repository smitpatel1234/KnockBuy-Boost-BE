import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../port/item-repo.port";

export const get_all_items = async (
    em: EntityManager,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.GetAllItems(em);
};
