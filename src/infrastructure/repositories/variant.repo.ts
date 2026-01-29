import { EntityManager } from "typeorm";

import { VariantRepoPort } from "../../application/port/variant-repo.port";
import { pageParams, PaginationResponse, } from "../../domain/globalTypes/commonFields";
import { VariantCollectionForOneItem, VariantForOneItem, } from "../../domain/models/item.models";
import {
  GetItemVariantValueMappingModel,
  VariantPropertyModel,
  VariantValueModel,
  VariantValueModelWithvariantProperty,
} from "../../domain/models/Variant.models";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { ItemVariantValueMapping } from "../orm/entities/item_variantVlaue_mapping";
import { VariantCollection } from "../orm/entities/variant_collection";
import { VariantPropertys } from "../orm/entities/variantPropertys";
import { VariantValues } from "../orm/entities/variantValues";
export const VariantRepo: VariantRepoPort = {
  createProperty: async ( em: EntityManager, data: VariantPropertyModel ) : Promise<VariantPropertys> => {
    const entity = em.create(VariantPropertys, { property_name: data.property_name});
    return em.save(entity);
  },
  createValue: async ( em: EntityManager, data: VariantValueModel ): Promise<VariantValues> => {
    const property = await em.findOneOrFail(VariantPropertys, { where: { variantProperty_id: data.variantProperty_id } });
    const entity = em.create(VariantValues, { variant_value: data.variant_value, variantProperty: property }); 
    return em.save(entity);
  },
  createVariantCollection: async (em: EntityManager, variant_collections: undefined | VariantCollectionForOneItem[], item_id: string): Promise<void> => {
    if (variant_collections && variant_collections.length > 0) {
      const vcRepo = em.getRepository(VariantCollection);
      const vcs = variant_collections.map((vid) => vcRepo.create({ main_item: { item_id: item_id }, variant_item: { item_id: vid.item_id } }));
      if (vcs.length > 0) await vcRepo.save(vcs);
    }
  },
  deleteItemVariantMapping: async (em: EntityManager, item_id: string): Promise<boolean> => {
    const value = await em.delete(ItemVariantValueMapping, { item: { item_id: item_id } });
    return (value.affected ?? 0) > 0;
  },
  deleteProperty: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.delete(VariantPropertys, { variantProperty_id: id });
    return (result.affected ?? 0) > 0;
  },
  deleteValue: async (em: EntityManager, id: string): Promise<boolean> => {
    const result = await em.delete(VariantValues, { variantValue_id: id });
    return (result.affected ?? 0) > 0;
  },
  deleteVariantCollection: async (em: EntityManager, item_id: string): Promise<void> => {
    await em.delete(VariantCollection, { main_item: { item_id: item_id } });
  },
  getall_variant_values: async (em: EntityManager) => {
    return em
      .getRepository(VariantValues).createQueryBuilder("vv").leftJoin("vv.variantProperty", "vp")
      .select([
        "vv.variantValue_id AS variantValue_id",
        "vv.variant_value AS variant_value",
        "vp.variantProperty_id AS variantProperty_id",
        "vp.property_name AS property_name",
      ])
      .getRawMany();
  },
  getall_variant_values_page: async (em: EntityManager, data: pageParams): Promise<PaginationResponse<VariantValueModelWithvariantProperty>> => {
    const qb = em
      .getRepository(VariantValues).createQueryBuilder("vv").leftJoin("vv.variantProperty", "vp")
      .select([
        "vv.variantValue_id AS variantValue_id",
        "vv.variant_value AS variant_value",
        "vp.variantProperty_id AS variantProperty_id",
        "vp.property_name AS property_name",
      ]);
    const cqb = em.getRepository(VariantValues).createQueryBuilder("vv").groupBy("vv.variantValue_id");
    return applyPaginationAndFilters<VariantValues, VariantValueModelWithvariantProperty>(
      qb, cqb, data,
      [
        "vv.variantValue_id",
        "vv.variant_value",
        "vp.variantProperty_id",
        "vp.property_name",
        "variantValue_id",
        "variant_value",
        "variantProperty_id",
        "property_name"
      ]
    );
  },
  getAllVariantProperties: async (em: EntityManager): Promise<VariantPropertys[]> => {
    const data = await em.find(VariantPropertys);
    return data;
  },
  getItemVariantCollectionForItem: async (em: EntityManager, item_id: string) => {
    return await em
      .getRepository(VariantCollection).createQueryBuilder("vc").leftJoin("vc.variant_item", "item")
      .select([
        "item.item_id AS item_id",
        "item.item_name AS item_name",
        "item.item_price AS item_price",
        "item.description AS description",
        "item.rating AS rating",
        "item.sku AS sku",
        "item.stock AS stock",
        "item.slug AS slug",
      ])
      .where("vc.main_item = :itemId", { itemId: item_id })
      .addSelect((subQuery) => {
        return subQuery.select("image.image_URL").from("image", "image").where("image.items_id = item.item_id").limit(1);}, "image_url")
        .getRawMany<VariantCollectionForOneItem>();
  },
  getItemVariantMappingForItem: async (em: EntityManager, id: string): Promise<GetItemVariantValueMappingModel[]> => {
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
  mapItemToVariantValue: async (em: EntityManager, variant: undefined | VariantForOneItem[], item_id: string): Promise<void> => {
    if (variant && variant.length > 0) {
      const mappingRepo = em.getRepository(ItemVariantValueMapping);
      const mappings = variant.map((v) => mappingRepo.create({ item: { item_id: item_id }, variantValue: { variantValue_id: v.variantValue_id } }))
      await mappingRepo.save(mappings);
    }
  },
  updateProperty: async (em: EntityManager, data: VariantPropertyModel): Promise<null | VariantPropertyModel> => {
    if (!data.variantProperty_id) return null;
    const entity = await em.findOne(VariantPropertys, { where: { variantProperty_id: data.variantProperty_id } });
    if (!entity) return null;
    entity.property_name = data.property_name;
    const variant = await em.save(entity);
    return variant;
  },
  updateValue: async (em: EntityManager, data: VariantValueModel): Promise<null | VariantValues> => {
    if (!data.variantValue_id) return null;
    const entity = await em.findOne(VariantValues, { where: { variantValue_id: data.variantValue_id } });
    if (!entity) return null;
    const variantProperty = await em.findOneOrFail(VariantPropertys, { where: { variantProperty_id: data.variantProperty_id } });
    entity.variant_value = data.variant_value;
    entity.variantProperty = variantProperty;
    await em.save(entity);
    return entity;
  },
  wrapTransaction: wrapTransaction,
};
