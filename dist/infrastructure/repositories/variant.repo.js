"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRepo = void 0;
const variantPropertys_1 = require("../orm/entities/variantPropertys");
const variantValues_1 = require("../orm/entities/variantValues");
const item_variantVlaue_mapping_1 = require("../orm/entities/item_variantVlaue_mapping");
const variant_collection_1 = require("../orm/entities/variant_collection");
const item_1 = require("../orm/entities/item");
const transaction_1 = require("../helper/transaction");
const pagination_helper_1 = require("../helper/pagination.helper");
exports.VariantRepo = {
    getAllVariantProperties: async (em) => {
        const data = await em.find(variantPropertys_1.VariantPropertys);
        return data;
    },
    createProperty: async (em, data) => {
        const entity = em.create(variantPropertys_1.VariantPropertys, {
            property_name: data.property_name,
        });
        return em.save(entity);
    },
    updateProperty: async (em, data) => {
        const entity = await em.findOne(variantPropertys_1.VariantPropertys, {
            where: { variantProperty_id: data.variantProperty_id },
        });
        if (!entity) {
            return null;
        }
        entity.property_name = data.property_name;
        await em.save(entity);
        return true;
    },
    deleteProperty: async (em, id) => {
        const result = await em.delete(variantPropertys_1.VariantPropertys, {
            variantProperty_id: id,
        });
        return (result.affected ?? 0) > 0;
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
    updateValue: async (em, data) => {
        try {
            const entity = await em.findOne(variantValues_1.VariantValues, {
                where: { variantValue_id: data.variantValue_id },
            });
            if (!entity) {
                return null;
            }
            const variantProperty = await em.findOneOrFail(variantPropertys_1.VariantPropertys, {
                where: { variantProperty_id: data.variantProperty_id }
            });
            entity.variant_value = data.variant_value;
            entity.variantProperty = variantProperty;
            await em.save(entity);
            return entity;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error while updating value";
            throw Error(errorMessage);
        }
    },
    deleteValue: async (em, id) => {
        const result = await em.delete(variantValues_1.VariantValues, {
            variantValue_id: id,
        });
        return (result.affected ?? 0) > 0;
    },
    getall_variant_values: async (em, data) => {
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
        return (0, pagination_helper_1.applyPaginationAndFilters)(qb, data);
    },
    mapItemToVariantValue: async (em, data) => {
        const item = await em.findOneOrFail(item_1.Item, {
            where: { item_id: data.item_id },
        });
        const value = await em.findOneOrFail(variantValues_1.VariantValues, {
            where: { variantValue_id: data.variantValue_id },
        });
        const entity = em.create(item_variantVlaue_mapping_1.ItemVariantValueMapping, {
            item,
            variantValue: value,
        });
        return em.save(entity);
    },
    deleteItemVariantMapping: async (em, id) => {
        const value = await em.delete(item_variantVlaue_mapping_1.ItemVariantValueMapping, {
            item_variantvalue_mapping_id: id,
        });
        return (value.affected ?? 0) > 0;
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
    createVariantCollection: async (em, data) => {
        const item = await em.findOneOrFail(item_1.Item, {
            where: { item_id: data.item_id },
        });
        const variantItem = await em.findOneOrFail(item_1.Item, {
            where: { item_id: data.variant_item_id },
        });
        const entity = em.create(variant_collection_1.VariantCollection, {
            item_id: item,
            variant_item_id: variantItem,
        });
        return em.save(entity);
    },
    deleteVariantCollection: async (em, id) => {
        await em.delete(variant_collection_1.VariantCollection, {
            variant_collection_id: id,
        });
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
