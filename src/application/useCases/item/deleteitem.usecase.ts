import { EntityManager } from "typeorm";

import { ItemRepoPort } from "../../port/item-repo.port";

export const delete_item = async (
    em: EntityManager,
    id: string,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.DeleteItem(em, id);
};