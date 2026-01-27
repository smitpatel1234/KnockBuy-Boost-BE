import { EntityManager } from "typeorm";

import {
  pageParams,
  PaginationResponse,
  searchPageParams,
} from "../../domain/globalTypes/commonFields";
import {
  AddItemModel,
  GetItemModel,
  ItemModel,
} from "../../domain/models/item.models";

export interface ItemRepoPort {
  CreateItem: (em: EntityManager, data: AddItemModel) => Promise<boolean>;
  DeleteItem: (em: EntityManager, id: string) => Promise<boolean>;
  GetAllItems: (em: EntityManager) => Promise<GetItemModel[]>;
  GetAllItemsPage: (
    em: EntityManager,
    data: pageParams
  ) => Promise<PaginationResponse<GetItemModel>>;
  getImagesByItemId: (em: EntityManager, id: string) => Promise<string[]>;
  getItemByIdOrSlug: (
    em: EntityManager,
    id?: string,
    slug?: string
  ) => Promise<GetItemModel | undefined>;
  ISItemInStock: (
    em: EntityManager,
    item_id: string,
    quantity: number
  ) => Promise<boolean>;
  searchItems: (
    em: EntityManager,
    data: searchPageParams
  ) => Promise<PaginationResponse<Partial<GetItemModel>>>;
  searchItemsByName: (em: EntityManager, query: string) => Promise<GetItemModel[]>;
  UpdateItem: (em: EntityManager, data: ItemModel) => Promise<boolean>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
