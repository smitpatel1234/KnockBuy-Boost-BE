import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";

export const get_itemcart = async (entitiesManager:EntityManager,ItemCartRepo: ItemCartRepoPort, user_id:string) => {
    
    return await ItemCartRepo.getAllItemCartEntry(entitiesManager,user_id);
};