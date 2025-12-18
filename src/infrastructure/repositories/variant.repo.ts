import { EntityManager } from "typeorm";
import { VariantRepoPort } from "../../application/port/variant-repo.port";
import {
  VariantPropertyModel,
  VariantValueModel,
  ItemVariantValueMappingModel,
  VariantCollectionModel,
} from "../../domain/models/Variant.models";
import { VariantPropertys } from "../orm/entities/variantPropertys";
import { VariantValues } from "../orm/entities/variantValues";
import { ItemVariantValueMapping } from "../orm/entities/item_variantVlaue_mapping";
import { VariantCollection } from "../orm/entities/variant_collection";
import { Item } from "../orm/entities/item";
import { UUID } from "crypto";
import { wrapTransaction } from "../helper/transaction";

export const  VariantRepo : VariantRepoPort =  {
 
  getAllVariantProperties: async (
    em: EntityManager
  ): Promise<VariantPropertys[]> => {
    return em.find(VariantPropertys);
  },
  createProperty : async(
    em: EntityManager,
    data: VariantPropertyModel
  ): Promise<VariantPropertys> => {
    const entity = em.create(VariantPropertys, {
      property_name: data.property_name,
    });
    return em.save(entity);
  },

  updateProperty : async (
    em: EntityManager,
    data: VariantPropertyModel
  ): Promise<boolean | null> =>{
    try {
      const entity = await em.findOne(VariantPropertys, {
        where: { variantProperty_id: data.variantProperty_id  as UUID },
      });
      if (!entity) {
        return null;
      }
      entity.property_name = data.property_name;
      await em.save(entity);
      return true;
    } catch (error) {
      console.error("Error while updating property:", error);
      throw error;
    }
  },
  deleteProperty :async (
    em: EntityManager,
    id: UUID
  ): Promise<void> => {
    await em.delete(VariantPropertys, {
      variantProperty_id: id as unknown as UUID,
    });
  },

  createValue :async (
    em: EntityManager,
    data: VariantValueModel
  ): Promise<VariantValues> =>{
    const property = await em.findOneOrFail(VariantPropertys, {
      where: {
        variantProperty_id: data.variantProperty_id as unknown as UUID,
      },
    });

    const entity = em.create(VariantValues, {
      variant_value: data.variant_value,
      variantProperty: property,
    });

    return em.save(entity);
  },



  deleteValue : async (
    em: EntityManager,
    id: UUID
  ): Promise<void>   => {
    await em.delete(VariantValues, {
      varientValue_id: id as unknown as UUID,
    });
  },

   mapItemToVariantValue :  async (
    em: EntityManager,
    data: ItemVariantValueMappingModel
  ): Promise<ItemVariantValueMapping> => {
    const item = await em.findOneOrFail(Item, {
      where: { item_id: data.item_id as unknown as UUID },
    });

    const value = await em.findOneOrFail(VariantValues, {
      where: { variantValue_id: data.variantValue_id as unknown as UUID },
    });

    const entity = em.create(ItemVariantValueMapping, {
      item,
      variantValue: value,
    });

    return em.save(entity);
  },

  deleteItemVariantMapping : async (
    em: EntityManager,
    id: UUID
  ): Promise<void> => {
    await em.delete(ItemVariantValueMapping, {
      item_variantvalue_mapping_id: id as unknown as UUID,
    });
  },

  createVariantCollection : async (
    em: EntityManager,
    data: VariantCollectionModel
  ): Promise<VariantCollection> => {
    const item = await em.findOneOrFail(Item, {
      where: { item_id: data.item_id as unknown as UUID },
    });

    const variantItem = await em.findOneOrFail(Item, {
      where: { item_id: data.variant_item_id as unknown as UUID },
    });

    const entity = em.create(VariantCollection, {
      item_id: item,
      variant_item_id: variantItem,
    });

    return em.save(entity);
  },

  deleteVariantCollection : async (
    em: EntityManager,
    id: UUID
  ): Promise<void> => {
    await em.delete(VariantCollection, {
      variant_collection_id: id as unknown as UUID,
    });
  },
  wrapTransaction: wrapTransaction,
}
