import { EntityManager } from "typeorm";

import { ItemModel } from "../../../domain/models/item.models";
import { ItemRepoPort } from "../../port/item-repo.port";

export const update_item = async (
    em: EntityManager,
    item: ItemModel,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.UpdateItem(em, item);
};