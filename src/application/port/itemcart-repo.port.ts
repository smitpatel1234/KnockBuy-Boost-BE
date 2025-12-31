import { EntityManager } from "typeorm";
import { ItemCartType, ItemCartUpdateType, ItemCartDeleteType,GetAllItemCartType,AddItemCartType } from "../../domain/models/itemcart.models";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";

export interface ItemCartRepoPort {
    getAllItemCartEntry: (em: EntityManager,user_id: string) => Promise<GetAllItemCartType[]>;
    updateItemCartEntry: (em: EntityManager, data: ItemCartUpdateType) => Promise<boolean>;
    deleteItemCartEntry: (em: EntityManager, data: ItemCartDeleteType) => Promise<boolean>;
    crateItemCartEntry: (em: EntityManager, data: AddItemCartType) => Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
