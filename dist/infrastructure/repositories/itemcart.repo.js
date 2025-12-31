"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCartRepo = void 0;
const item_cart_1 = require("../orm/entities/item_cart");
const transaction_1 = require("../helper/transaction");
exports.ItemCartRepo = {
    getAllItemCartEntry: async (em, user_id) => {
        const q = em.getRepository(item_cart_1.ItemCart).createQueryBuilder("itemcart");
        q.where("itemcart.user = :user_id", { user_id });
        q.leftJoin("itemcart.item", "item").select([
            "itemcart.cart_item_id",
            "itemcart.quantity",
            "item.item_name",
            "item.item_price",
            "item.stock",
        ]);
        return q.getRawMany();
    },
    updateItemCartEntry: async (em, data) => {
        if (data.quantity == 0) {
            const result = await em.getRepository(item_cart_1.ItemCart).delete(data.cart_item_id);
            return (result.affected ?? 0) > 0;
        }
        if (data.quantity > 0) {
            const result = await em
                .getRepository(item_cart_1.ItemCart)
                .update(data.cart_item_id, { quantity: data.quantity });
            return (result.affected ?? 0) > 0;
        }
        return false;
    },
    deleteItemCartEntry: async (em, data) => {
        const result = await em.getRepository(item_cart_1.ItemCart).delete(data.cart_item_id);
        return (result.affected ?? 0) > 0;
    },
    crateItemCartEntry: async (em, data) => {
        const cart_item = em.create(item_cart_1.ItemCart, {
            item: data.item,
            user: data.user,
            quantity: data.quantity,
        });
        const result = await em.getRepository(item_cart_1.ItemCart).save(cart_item);
        return !!result;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
