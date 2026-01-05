import e from "express";
import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../application/port/variant-repo.port";
import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import {
  GetItemVariantValueMappingModel,
  ItemVariantValueMappingModel,
  VariantCollectionModel,
  VariantPropertyModel,
  VariantValueModel,
  VariantValueModelWithvariantProperty,
} from "../../domain/models/Variant.models";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { Item } from "../orm/entities/item";
import { ItemVariantValueMapping } from "../orm/entities/item_variantVlaue_mapping";
import { VariantCollection } from "../orm/entities/variant_collection";
import { VariantPropertys } from "../orm/entities/variantPropertys";
import { VariantValues } from "../orm/entities/variantValues";

export const VariantRepo: VariantRepoPort = {
  createProperty: async (
    em: EntityManager,
    data: VariantPropertyModel
  ): Promise<VariantPropertys> => {
    const entity = em.create(VariantPropertys, {
      property_name: data.property_name,
    });
    return em.save(entity);
  },
  createValue: async (
    em: EntityManager,
    data: VariantValueModel
  ): Promise<VariantValues> => {
    const property = await em.findOneOrFail(VariantPropertys, {
      where: {
        variantProperty_id: data.variantProperty_id as unknown as string,
      },
    });

    const entity = em.create(VariantValues, {
      variant_value: data.variant_value,
      variantProperty: property,
    });

    return em.save(entity);
  },

  createVariantCollection: async (
    em: EntityManager,
    data: VariantCollectionModel
  ): Promise<VariantCollection> => {
    const item = await em.findOneOrFail(Item, {
      where: { item_id: data.item_id as unknown as string },
    });

    const variantItem = await em.findOneOrFail(Item, {
      where: { item_id: data.variant_item_id as unknown as string },
    });

    const entity = em.create(VariantCollection, {
      main_item: item,
      variant_item: variantItem,
    });

    return em.save(entity);
  },
  deleteItemVariantMapping: async (
    em: EntityManager,
    id: string
  ): Promise<boolean> => {
    const value = await em.delete(ItemVariantValueMapping, {
      item_variantvalue_mapping_id: id as unknown as string,
    });
    return (value.affected ?? 0) > 0;
  },

  deleteProperty: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.delete(VariantPropertys, {
      variantProperty_id: id as unknown as string,
    });
    return (result.affected ?? 0) > 0;
  },
  deleteValue: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.delete(VariantValues, {
      variantValue_id: id as unknown as string,
    });
    return (result.affected ?? 0) > 0;
  },

  deleteVariantCollection: async (
    em: EntityManager,
    id: string
  ): Promise<void> => {
    await em.delete(VariantCollection, {
      variant_collection_id: id as unknown as string,
    });
  },
  getall_variant_values: async (em: EntityManager, data: VariantValueModel) => {
    return em
      .getRepository(VariantValues)
      .createQueryBuilder("vv")
      .leftJoin("vv.variantProperty", "vp")
      .select([
        "vv.variantValue_id AS variantValue_id",
        "vv.variant_value AS variant_value",
        "vp.variantProperty_id AS variantProperty_id",
        "vp.property_name AS property_name",
      ])
      .getRawMany();
  },

  getall_variant_values_page: async (
    em: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<VariantValueModelWithvariantProperty>> => {
    const qb = em
      .getRepository(VariantValues)
      .createQueryBuilder("vv")
      .leftJoin("vv.variantProperty", "vp")
      .select([
        "vv.variantValue_id AS variantValue_id",
        "vv.variant_value AS variant_value",
        "vp.variantProperty_id AS variantProperty_id",
        "vp.property_name AS property_name",
      ]);

    return applyPaginationAndFilters<VariantValueModelWithvariantProperty>(
      qb,
      data
    );
  },

  getAllVariantProperties: async (
    em: EntityManager
  ): Promise<VariantPropertys[]> => {
    const data = await em.find(VariantPropertys);

    return data;
  },

  getItemVariantMappingForItem: async (
    em: EntityManager,
    id: string
  ): Promise<GetItemVariantValueMappingModel[]> => {
    return em
      .getRepository(ItemVariantValueMapping)
      .createQueryBuilder("ivvm")
      .leftJoin("ivvm.variantValue", "vv")
      .leftJoin("vv.variantProperty", "vp")
      .where("ivvm.item_id=:id", { id: id })
      .select([
        "ivvm.item_variantvalue_mapping_id AS item_variantvalue_mapping_id",
        "ivvm.item_id AS item_id",
        "vv.variantValue_id AS variantValue_id",
        "vv.variant_value AS variant_value",
        "vp.variantProperty_id AS variantProperty_id",
        "vp.property_name AS property_name",
      ])
      .getRawMany();
  },
  mapItemToVariantValue: async (
    em: EntityManager,
    data: ItemVariantValueMappingModel
  ): Promise<ItemVariantValueMapping> => {
    const item = await em.findOneOrFail(Item, {
      where: { item_id: data.item_id as unknown as string },
    });

    const value = await em.findOneOrFail(VariantValues, {
      where: { variantValue_id: data.variantValue_id as unknown as string },
    });

    const entity = em.create(ItemVariantValueMapping, {
      item,
      variantValue: value,
    });

    return em.save(entity);
  },
  updateProperty: async (
    em: EntityManager,
    data: VariantPropertyModel
  ): Promise<boolean | null> => {
    const entity = await em.findOne(VariantPropertys, {
      where: { variantProperty_id: data.variantProperty_id! },
    });
    if (!entity) {
      return null;
    }
    entity.property_name = data.property_name;
    await em.save(entity);
    return true;
  },

  updateValue: async (em: EntityManager, data: VariantValueModel) => {
    try {
      const entity = await em.findOne(VariantValues, {
        where: { variantValue_id: data.variantValue_id! },
      });
      if (!entity) {
        return null;
      }

      const variantProperty = await em.findOneOrFail(VariantPropertys, {
        where: { variantProperty_id: data.variantProperty_id }
      });

      entity.variant_value = data.variant_value;
      entity.variantProperty = variantProperty;
      await em.save(entity);
      return entity;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error while updating value";
      throw Error(errorMessage);
    }
  },
  wrapTransaction: wrapTransaction,
};
