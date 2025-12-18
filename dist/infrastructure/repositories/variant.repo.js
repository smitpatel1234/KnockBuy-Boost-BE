"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRepo = void 0;
const variantPropertys_1 = require("../orm/entities/variantPropertys");
const variantValues_1 = require("../orm/entities/variantValues");
const item_variantVlaue_mapping_1 = require("../orm/entities/item_variantVlaue_mapping");
const variant_collection_1 = require("../orm/entities/variant_collection");
const item_1 = require("../orm/entities/item");
const transaction_1 = require("../helper/transaction");
exports.VariantRepo = {
    getAllVariantProperties: async (em) => {
        return em.find(variantPropertys_1.VariantPropertys);
    },
    createProperty: async (em, data) => {
        const entity = em.create(variantPropertys_1.VariantPropertys, {
            property_name: data.property_name,
        });
        return em.save(entity);
    },
    updateProperty: async (em, data) => {
        try {
            const entity = await em.findOne(variantPropertys_1.VariantPropertys, {
                where: { variantProperty_id: data.variantProperty_id },
            });
            if (!entity) {
                return null;
            }
            entity.property_name = data.property_name;
            await em.save(entity);
            return true;
        }
        catch (error) {
            console.error("Error while updating property:", error);
            throw error;
        }
    },
    deleteProperty: async (em, id) => {
        await em.delete(variantPropertys_1.VariantPropertys, {
            variantProperty_id: id,
        });
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
    deleteValue: async (em, id) => {
        await em.delete(variantValues_1.VariantValues, {
            varientValue_id: id,
        });
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
        await em.delete(item_variantVlaue_mapping_1.ItemVariantValueMapping, {
            item_variantvalue_mapping_id: id,
        });
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
