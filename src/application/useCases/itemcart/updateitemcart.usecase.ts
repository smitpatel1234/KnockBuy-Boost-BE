import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { ItemCartType } from "../../../domain/models/itemcart.models";
export const update_itemcart = async (entitiesManager:EntityManager,ItemCartRepo: ItemCartRepoPort, data:ItemCartType ) => {
    return await ItemCartRepo.updateItemCartEntry(entitiesManager,data);
};