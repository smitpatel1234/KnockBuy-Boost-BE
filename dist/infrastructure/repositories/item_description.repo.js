"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemDescriptionRepo = void 0;
const transaction_1 = require("../helper/transaction");
const item_description_1 = require("../orm/entities/item_description");
exports.ItemDescriptionRepo = {
    getDescriptionByItemId: async (em, itemId) => {
        return await em.findOne(item_description_1.ItemDescription, { where: { item_id: itemId } });
    },
    upsertDescription: async (em, itemId, data) => {
        let description = await em.findOne(item_description_1.ItemDescription, { where: { item_id: itemId } });
        if (description) {
            em.merge(item_description_1.ItemDescription, description, data);
        }
        else {
            description = em.create(item_description_1.ItemDescription, { ...data, item_id: itemId });
        }
        return await em.save(item_description_1.ItemDescription, description);
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
