"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRepo = void 0;
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const item_variantVlaue_mapping_1 = require("../orm/entities/item_variantVlaue_mapping");
const variant_collection_1 = require("../orm/entities/variant_collection");
const variantPropertys_1 = require("../orm/entities/variantPropertys");
const variantValues_1 = require("../orm/entities/variantValues");
exports.VariantRepo = {
    createProperty: async (em, data) => {
        const entity = em.create(variantPropertys_1.VariantPropertys, {
            property_name: data.property_name,
        });
        return em.save(entity);
    },
    createValue: async (em, data) => {
        const property = await em.findOneOrFail(variantPropertys_1.VariantPropertys, {
            where: {
                variantProperty_id: data.variantProperty_id,
            },
        });
        const entity = em.create(variantValues_1.VariantValues, {
            variant_value: data.variant_value,
            variantProperty: property,
        });
        return em.save(entity);
    },
    createVariantCollection: async (em, variant_collections, item_id) => {
        if (variant_collections && variant_collections.length > 0) {
            const vcRepo = em.getRepository(variant_collection_1.VariantCollection);
            const vcs = variant_collections.map((vid) => vcRepo.create({
                main_item: { item_id: item_id },
                variant_item: { item_id: vid.item_id },
            }));
            if (vcs.length > 0)
                await vcRepo.save(vcs);
        }
    },
    deleteItemVariantMapping: async (em, item_id) => {
        const value = await em.delete(item_variantVlaue_mapping_1.ItemVariantValueMapping, {
            item: { item_id: item_id },
        });
        return (value.affected ?? 0) > 0;
    },
    deleteProperty: async (em, id) => {
        const result = await em.delete(variantPropertys_1.VariantPropertys, {
            variantProperty_id: id,
        });
        return (result.affected ?? 0) > 0;
    },
    deleteValue: async (em, id) => {
        const result = await em.delete(variantValues_1.VariantValues, {
            variantValue_id: id,
        });
        return (result.affected ?? 0) > 0;
    },
    deleteVariantCollection: async (em, item_id) => {
        await em.delete(variant_collection_1.VariantCollection, {
            main_item: { item_id: item_id },
        });
    },
    getall_variant_values: async (em) => {
        return em
            .getRepository(variantValues_1.VariantValues)
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
    getall_variant_values_page: async (em, data) => {
        const qb = em
            .getRepository(variantValues_1.VariantValues)
            .createQueryBuilder("vv")
            .leftJoin("vv.variantProperty", "vp")
            .select([
            "vv.variantValue_id AS variantValue_id",
            "vv.variant_value AS variant_value",
            "vp.variantProperty_id AS variantProperty_id",
            "vp.property_name AS property_name",
        ]);
        const cqb = em
            .getRepository(variantValues_1.VariantValues)
            .createQueryBuilder("vv")
            .groupBy("vv.variantValue_id");
        return (0, pagination_helper_1.applyPaginationAndFilters)(qb, cqb, data, [
            "vv.variantValue_id",
            "vv.variant_value",
            "vp.variantProperty_id",
            "vp.property_name",
            "variantValue_id",
            "variant_value",
            "variantProperty_id",
            "property_name"
        ]);
    },
    getAllVariantProperties: async (em) => {
        const data = await em.find(variantPropertys_1.VariantPropertys);
        return data;
    },
    getItemVariantCollectionForItem: async (em, item_id) => {
        return await em
            .getRepository(variant_collection_1.VariantCollection)
            .createQueryBuilder("vc")
            .leftJoin("vc.variant_item", "item")
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
            return subQuery
                .select("image.image_URL")
                .from("image", "image")
                .where("image.items_id = item.item_id")
                .limit(1);
        }, "image_url")
            .getRawMany();
    },
    getItemVariantMappingForItem: async (em, id) => {
        return em
            .getRepository(item_variantVlaue_mapping_1.ItemVariantValueMapping)
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
    mapItemToVariantValue: async (em, variant, item_id) => {
        if (variant && variant.length > 0) {
            const mappingRepo = em.getRepository(item_variantVlaue_mapping_1.ItemVariantValueMapping);
            const mappings = variant.map((v) => mappingRepo.create({
                item: { item_id: item_id },
                variantValue: { variantValue_id: v.variantValue_id },
            }));
            await mappingRepo.save(mappings);
        }
    },
    updateProperty: async (em, data) => {
        if (!data.variantProperty_id) {
            return null;
        }
        const entity = await em.findOne(variantPropertys_1.VariantPropertys, {
            where: { variantProperty_id: data.variantProperty_id },
        });
        if (!entity) {
            return null;
        }
        entity.property_name = data.property_name;
        const variant = await em.save(entity);
        return variant;
    },
    updateValue: async (em, data) => {
        if (!data.variantValue_id) {
            return null;
        }
        const entity = await em.findOne(variantValues_1.VariantValues, {
            where: { variantValue_id: data.variantValue_id },
        });
        if (!entity) {
            return null;
        }
        const variantProperty = await em.findOneOrFail(variantPropertys_1.VariantPropertys, {
            where: { variantProperty_id: data.variantProperty_id },
        });
        entity.variant_value = data.variant_value;
        entity.variantProperty = variantProperty;
        await em.save(entity);
        return entity;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
