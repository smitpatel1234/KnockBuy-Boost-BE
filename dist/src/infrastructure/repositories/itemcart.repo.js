"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCartRepo = void 0;
const GlobelErrorHandler_1 = require("../helper/middleware/GlobelErrorHandler");
const transaction_1 = require("../helper/transaction");
const item_cart_1 = require("../orm/entities/item_cart");
const item_repo_1 = require("../repositories/item.repo");
exports.ItemCartRepo = {
    clearCartEntry: async (em, user_id) => {
        const result = await em.getRepository(item_cart_1.ItemCart).delete({ user: { user_id } });
        return (result.affected ?? 0) > 0;
    },
    crateItemCartEntry: async (em, data) => {
        const exist = await em.getRepository(item_cart_1.ItemCart).findOne({
            where: {
                item: { item_id: data.item },
                user: { user_id: data.user },
            },
        });
        if (exist) {
            const ISItemInStock = await item_repo_1.ItemRepo.ISItemInStock(em, data.item, exist.quantity + data.quantity);
            if (!ISItemInStock) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "stock is not availabel");
            }
            const result = await em
                .getRepository(item_cart_1.ItemCart)
                .update(exist.cart_item_id, { quantity: exist.quantity + data.quantity });
            return (result.affected ?? 0) > 0;
        }
        const cart_item = em.create(item_cart_1.ItemCart, {
            item: { item_id: data.item },
            quantity: data.quantity,
            user: { user_id: data.user },
        });
        const result = await em.getRepository(item_cart_1.ItemCart).save(cart_item);
        return !!result;
    },
    deleteItemCartEntry: async (em, data) => {
        const result = await em.getRepository(item_cart_1.ItemCart).delete({ cart_item_id: data.cart_item_id });
        return (result.affected ?? 0) > 0;
    },
    getAllItemCartEntry: async (em, user_id) => {
        const q = em.getRepository(item_cart_1.ItemCart).createQueryBuilder("itemcart").withDeleted();
        q.where("itemcart.user = :user_id", { user_id });
        q.leftJoin("itemcart.item", "item")
            .addSelect((subQuery) => {
            return subQuery
                .select("img.image_URL")
                .from("image", "img")
                .where("img.items_id = item.item_id")
                .limit(1);
        }, "image_url")
            .select([
            "itemcart.cart_item_id as cart_item_id",
            "itemcart.user as user",
            "itemcart.item as item_id",
            "itemcart.quantity as quantity",
            "item.item_name as item_name",
            "item.item_price as item_price",
            "item.stock as stock",
            "item.deleted_at as deleted_at",
        ])
            .addSelect(subQuery => {
            return subQuery
                .select("img.image_URL", "image_url")
                .from("image", "img")
                .where("img.items_id = item.item_id")
                .limit(1);
        }, "image_url");
        return await q.getRawMany();
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
    wrapTransaction: transaction_1.wrapTransaction,
};
