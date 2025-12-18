import { EntityManager } from "typeorm";
import { UUID } from "crypto";
import {
  VariantPropertyModel,
  VariantValueModel,
  ItemVariantValueMappingModel,
  VariantCollectionModel,
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

  updateProperty:(
    em: EntityManager,
    data: VariantPropertyModel
  ) => Promise<boolean | null>;

  deleteProperty:(
    em: EntityManager,
    id: UUID
  ) => Promise<void>;

  createValue:(
    em: EntityManager,
    data: VariantValueModel
  ) => Promise<VariantValues>;



  deleteValue:(
    em: EntityManager,
    id: UUID
  ) => Promise<void>;

  
  mapItemToVariantValue:(
    em: EntityManager,
    data: ItemVariantValueMappingModel
  ) => Promise<ItemVariantValueMapping>;

  deleteItemVariantMapping:(
    em: EntityManager,
    id: UUID
  ) => Promise<void>;

  
  createVariantCollection:(
    em: EntityManager,
    data: VariantCollectionModel
  ) =>  Promise<VariantCollection>;

  deleteVariantCollection:(
    em: EntityManager,
    id: UUID
  )  => Promise<void>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;

}
