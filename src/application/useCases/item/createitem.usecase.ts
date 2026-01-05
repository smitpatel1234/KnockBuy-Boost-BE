import { EntityManager } from "typeorm";

import { AddItemModel } from "../../../domain/models/item.models";
import { ItemRepoPort } from "../../port/item-repo.port";

export const create_item = async (
    em: EntityManager,
    item: AddItemModel,
    itemRepo: ItemRepoPort
) => {
    return await itemRepo.CreateItem(em, item);
};