import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { AddItemCartType } from "../../../domain/models/itemcart.models";
export const create_itemcart = async (entitiesManager:EntityManager,ItemCartRepo: ItemCartRepoPort, data:AddItemCartType ) => {
    
    return await ItemCartRepo.crateItemCartEntry(entitiesManager,data);
};