import { EntityManager } from "typeorm";

import {
  pageParams,
  PaginationResponse,
} from "../../domain/globalTypes/commonFields";
import { VariantCollectionForOneItem } from "../../domain/models/item.models";
import { VariantForOneItem } from "../../domain/models/item.models"
import {
  GetItemVariantValueMappingModel,
  // ItemVariantValueMappingModel,
  // VariantCollectionModel,
  VariantPropertyModel,
  VariantValueModel,
  VariantValueModelWithvariantProperty,
} from "../../domain/models/Variant.models";
import { VariantPropertys } from "../../infrastructure/orm/entities/variantPropertys";
import { VariantValues } from "../../infrastructure/orm/entities/variantValues";
export interface VariantRepoPort {
  createProperty: (
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<VariantPropertys>;
  createValue: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValues>;

  createVariantCollection: (
       em: EntityManager,
    variant_collections: undefined | VariantCollectionForOneItem[],
    item_id:string
  ) => Promise<void>;

  deleteItemVariantMapping: (em: EntityManager, item_id: string) => Promise<boolean>;

  deleteProperty: (em: EntityManager, id: string) => Promise<boolean>;

  deleteValue: (em: EntityManager, id: string) => Promise<boolean>;

  deleteVariantCollection: (em: EntityManager, item_id: string) => Promise<void>;

  getall_variant_values: (
    em: EntityManager
  ) => Promise<VariantValueModelWithvariantProperty[]>;

  getall_variant_values_page: (
    em: EntityManager,
    data: pageParams
  ) => Promise<PaginationResponse<VariantValueModelWithvariantProperty>>;

  getAllVariantProperties: (em: EntityManager) => Promise<VariantPropertys[]>;

  getItemVariantCollectionForItem: (
    em: EntityManager,
    id: string
  ) => Promise<VariantCollectionForOneItem[]>;
  getItemVariantMappingForItem: (
    em: EntityManager,
    id: string
  ) => Promise<GetItemVariantValueMappingModel[]>;
  mapItemToVariantValue: (
    em: EntityManager,
    variant: undefined  | VariantForOneItem[],
    item_id: string
  ) => Promise<void>;

  updateProperty: (
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<null | VariantPropertyModel>;

  updateValue: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<null | VariantValues>;

  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
