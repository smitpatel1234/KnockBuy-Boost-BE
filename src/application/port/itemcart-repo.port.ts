import { EntityManager } from "typeorm";

import { AddItemCartType, GetAllItemCartType, ItemCartDeleteType, ItemCartUpdateType } from "../../domain/models/itemcart.models";

export interface ItemCartRepoPort {
    clearCartEntry: (em: EntityManager, user_id: string) => Promise<boolean>;
    crateItemCartEntry: (em: EntityManager, data: AddItemCartType) => Promise<boolean>;
    deleteItemCartEntry: (em: EntityManager, data: ItemCartDeleteType) => Promise<boolean>;
    getAllItemCartEntry: (em: EntityManager, user_id: string) => Promise<GetAllItemCartType[]>;
    updateItemCartEntry: (em: EntityManager, data: ItemCartUpdateType) => Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
