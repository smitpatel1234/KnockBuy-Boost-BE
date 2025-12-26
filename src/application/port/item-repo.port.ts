import { EntityManager } from "typeorm";
import { AddItemModel, ItemModel, GetItemModel } from "../../domain/models/item.models";

export interface ItemRepoPort {
    getItemBySlug: (em: EntityManager, slug: string) => Promise<ItemModel | null>;
    getItemById: (em: EntityManager, id: string) => Promise<ItemModel | null>;
    CreateItem: (em: EntityManager, data: AddItemModel) => Promise<boolean>;
    UpdateItem: (em: EntityManager, data: ItemModel) => Promise<boolean>;
    DeleteItem: (em: EntityManager, id: string) => Promise<boolean>;
    GetAllItems: (em: EntityManager) => Promise<GetItemModel[]>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
