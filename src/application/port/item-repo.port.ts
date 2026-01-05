import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { AddItemModel, GetItemModel, ItemModel } from "../../domain/models/item.models";

export interface ItemRepoPort {
    CreateItem: (em: EntityManager, data: AddItemModel) => Promise<boolean>;
    DeleteItem: (em: EntityManager, id: string) => Promise<boolean>;
    GetAllItems: (em: EntityManager) => Promise<GetItemModel[]>;
    GetAllItemsPage: (em: EntityManager, data: pageParams) => Promise<PaginationResponse<GetItemModel>>;
    getImagesByItemId: (em: EntityManager, id: string) => Promise<string[]>;
    getItemById: (em: EntityManager, id: string) => Promise<ItemModel | null>;
    getItemBySlug: (em: EntityManager, slug: string) => Promise<ItemModel | null>;
    UpdateItem: (em: EntityManager, data: ItemModel) => Promise<boolean>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
