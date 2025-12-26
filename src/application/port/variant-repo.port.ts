import { EntityManager } from "typeorm";
import {
  VariantPropertyModel,
  VariantValueModel,
  ItemVariantValueMappingModel,
  VariantCollectionModel,
  VariantValueModelWithvariantProperty,
  GetItemVariantValueMappingModel
} from "../../domain/models/Variant.models";
import { VariantPropertys } from "../../infrastructure/orm/entities/variantPropertys";
import { VariantValues } from "../../infrastructure/orm/entities/variantValues";
import { ItemVariantValueMapping } from "../../infrastructure/orm/entities/item_variantVlaue_mapping";
import { VariantCollection } from "../../infrastructure/orm/entities/variant_collection";

export interface VariantRepoPort {
  getAllVariantProperties: (
    em: EntityManager
  ) => Promise<VariantPropertys[]>;
  createProperty: (
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<VariantPropertys>;

  updateProperty: (
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<boolean | null>;

  deleteProperty: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;

  getall_variant_values: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValueModelWithvariantProperty[]>;
  createValue: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValues>;

  updateValue: (
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValues | null>;

  deleteValue: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;


  mapItemToVariantValue: (
    em: EntityManager,
    data: ItemVariantValueMappingModel
  ) => Promise<ItemVariantValueMapping>;

  deleteItemVariantMapping: (
    em: EntityManager,
    id: string
  ) => Promise<boolean>;
  getItemVariantMappingForItem: (
    em: EntityManager,
    id: string
  ) => Promise<GetItemVariantValueMappingModel[]>;



  createVariantCollection: (
    em: EntityManager,
    data: VariantCollectionModel
  ) => Promise<VariantCollection>;

  deleteVariantCollection: (
    em: EntityManager,
    id: string
  ) => Promise<void>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;

}
