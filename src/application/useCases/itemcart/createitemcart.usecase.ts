import { EntityManager } from "typeorm";
import { ItemRepo } from "../../../infrastructure/repositories/item.repo"
import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { AddItemCartType } from "../../../domain/models/itemcart.models";
import { ApplicationError ,ApplicationErrorType} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const create_itemcart = async (entitiesManager:EntityManager,ItemCartRepo: ItemCartRepoPort, data:AddItemCartType ) => {
        const ISItemInStock = await ItemRepo.ISItemInStock(entitiesManager,data.item,data.quantity)
        if(!ISItemInStock){
            throw new ApplicationError(ApplicationErrorType.BAD_REQUEST,"stock is not availabel")
        }
    return await ItemCartRepo.crateItemCartEntry(entitiesManager,data);
};