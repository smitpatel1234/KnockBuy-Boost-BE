import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import {
  GetItemVariantValueMappingModel,
  ItemVariantValueMappingModel,
  VariantCollectionModel,
  VariantPropertyModel,
  VariantValueModel,
  VariantValueModelWithvariantProperty
} from "../../domain/models/Variant.models";
import { ItemVariantValueMapping } from "../../infrastructure/orm/entities/item_variantVlaue_mapping";
import { VariantCollection } from "../../infrastructure/orm/entities/variant_collection";
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
    data: VariantCollectionModel
  ) => Promise<VariantCollection>;

  deleteItemVariantMapping: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;

  deleteProperty: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;

  deleteValue: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;

  deleteVariantCollection: (
    em: EntityManager,
    id: string
  ) => Promise<void>;

  getall_variant_values: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValueModelWithvariantProperty[]>;

  getall_variant_values_page: (
    em: EntityManager,
    data: pageParams
  ) => Promise<PaginationResponse<VariantValueModelWithvariantProperty>>;


  getAllVariantProperties: (
    em: EntityManager
  ) => Promise<VariantPropertys[]>;

  getItemVariantMappingForItem: (
    em: EntityManager,
    id: string
  ) => Promise<GetItemVariantValueMappingModel[]>;
  mapItemToVariantValue: (
    em: EntityManager,
    data: ItemVariantValueMappingModel
  ) => Promise<ItemVariantValueMapping>;



  updateProperty: (
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<boolean | null>;

  updateValue: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<null | VariantValues>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;

}
