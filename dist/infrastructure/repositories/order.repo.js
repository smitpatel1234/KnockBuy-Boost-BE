"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const order_items_1 = require("../orm/entities/order_items");
const order_1 = require("../orm/entities/order");
const transaction_1 = require("../helper/transaction");
const item_cart_1 = require("../orm/entities/item_cart");
const discount_1 = require("../orm/entities/discount");
const item_1 = require("../orm/entities/item");
const pagination_helper_1 = require("../helper/pagination.helper");
exports.OrderRepo = {
    placeOrder: async (em, data) => {
        const cartItems = await em.getRepository(item_cart_1.ItemCart).find({
            where: { user: { user_id: data.user_id } },
            relations: ["item"],
        });
        if (cartItems.length === 0) {
            throw new Error("Cart is empty");
        }
        let subtotal = 0;
        cartItems.forEach((cartItem) => {
            subtotal += cartItem.item.item_price * cartItem.quantity;
        });
        let total_amount = subtotal;
        let appliedDiscount = null;
        if (data.discount_id) {
            appliedDiscount = await em.getRepository(discount_1.Discount).findOne({
                where: { discount_id: data.discount_id, active_flag: 1 },
            });
            if (appliedDiscount) {
                if (appliedDiscount.discount_type === "percentage") {
                    total_amount = subtotal - (subtotal * (appliedDiscount.discount_amount ?? 0)) / 100;
                }
                else {
                    total_amount = subtotal - (appliedDiscount.discount_amount ?? 0);
                }
            }
        }
        const shipping = subtotal > 100 ? 0 : 9.99;
        total_amount += shipping;
        const order = em.create(order_1.Order, {
            user: { user_id: data.user_id },
            address: data.address_id ? { address_id: data.address_id } : undefined,
            discount: appliedDiscount ? { discount_id: appliedDiscount.discount_id } : undefined,
            payment_method: data.payment_method,
            subtotal,
            total_amount,
            status: "pending",
            delivery_status: "pending",
            payment_status: "pending",
        });
        const savedOrder = await em.save(order_1.Order, order);
        const orderItems = cartItems.map((cartItem) => {
            return em.create(order_items_1.OrderItems, {
                item: { item_id: cartItem.item.item_id },
                item_quantity: cartItem.quantity,
                item_purchase_price: cartItem.item.item_price,
                order: { order_id: savedOrder.order_id },
            });
        });
        await em.getRepository(order_items_1.OrderItems).save(orderItems);
        for (const cartItem of cartItems) {
            const item = cartItem.item;
            if (item.stock < cartItem.quantity) {
                throw new Error(`Insufficient stock for item: ${item.item_name}`);
            }
            item.stock -= cartItem.quantity;
            await em.getRepository(item_1.Item).save(item);
        }
        await em.getRepository(item_cart_1.ItemCart).delete({ user: { user_id: data.user_id } });
        return savedOrder.order_id;
    },
    getOrdersByUserId: async (em, user_id) => {
        return await em.getRepository(order_1.Order).find({
            where: { user: { user_id } },
            relations: ["order_items", "order_items.item", "order_items.item.images", "discount", "address"],
            order: { order_date: "DESC" },
        });
    },
    getOrderById: async (em, order_id) => {
        return await em.getRepository(order_1.Order).findOne({
            where: { order_id },
            relations: ["order_items", "order_items.item", "order_items.item.images", "discount", "address", "user"],
        });
    },
    GetAllOrdersPage: async (em, data) => {
        const qb = em
            .getRepository(order_1.Order)
            .createQueryBuilder("order")
            .leftJoin("order.user", "user")
            .select([
            "order.order_id AS order_id",
            "order.order_date AS order_date",
            "order.status AS status",
            "order.delivery_status AS delivery_status",
            "user.username AS username",
            "order.total_amount AS total_amount",
            "order.payment_status AS payment_status",
            "order.payment_method AS payment_method",
        ]);
        return (0, pagination_helper_1.applyPaginationAndFilters)(qb, data);
    },
    UpdateOrder: async (em, data) => {
        const orderRepo = em.getRepository(order_1.Order);
        const existing = await orderRepo.findOneBy({ order_id: data.order_id });
        if (!existing)
            return false;
        if (data.status)
            existing.status = data.status;
        if (data.delivery_status)
            existing.delivery_status = data.delivery_status;
        if (data.payment_status)
            existing.payment_status = data.payment_status;
        if (data.payment_method)
            existing.payment_method = data.payment_method;
        if (data.address_id)
            existing.address = { address_id: data.address_id };
        await orderRepo.save(existing);
        return true;
    },
    DeleteOrder: async (em, order_id) => {
        const result = await em.getRepository(order_1.Order).delete(order_id);
        return (result.affected ?? 0) > 0;
    },
    wrapTransaction: async (fn) => {
        return await (0, transaction_1.wrapTransaction)(fn);
    },
};
