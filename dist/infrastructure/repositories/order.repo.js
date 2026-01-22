"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const GlobelErrorHandler_1 = require("../helper/middleware/GlobelErrorHandler");
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const discount_1 = require("../orm/entities/discount");
const item_1 = require("../orm/entities/item");
const item_cart_1 = require("../orm/entities/item_cart");
const order_1 = require("../orm/entities/order");
const order_items_1 = require("../orm/entities/order_items");
const user_1 = require("../orm/entities/user");
exports.OrderRepo = {
    DeleteOrder: async (em, order_id) => {
        const result = await em.getRepository(order_1.Order).softDelete(order_id);
        return (result.affected ?? 0) > 0;
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
            "order.isNew AS isNew"
        ]).groupBy('order_id').addOrderBy('order.isNew', 'DESC');
        const cqb = em.getRepository(order_1.Order).createQueryBuilder("order");
        return (0, pagination_helper_1.applyPaginationAndFilters)(qb, cqb, data, [
            "order.order_id",
            "order.order_date",
            "order.status",
            "order.delivery_status",
            "user.username",
            "order.total_amount",
            "order.payment_status",
            "order.payment_method",
            "order_id",
            "order_date",
            "status",
            "delivery_status",
            "username",
            "total_amount",
            "payment_status",
            "payment_method",
            "isNew"
        ]);
    },
    getOrderById: async (em, order_id) => {
        const order = await em.getRepository(order_1.Order).findOne({
            relations: [
                "order_items",
                "order_items.item",
                "order_items.item.images",
                "discount",
                "address",
            ],
            withDeleted: true,
            where: { order_id },
        });
        await em.getRepository(order_1.Order).update({ order_id }, { isNew: 0 });
        const user = await em.getRepository(user_1.User)
            .createQueryBuilder('user')
            .select([
            "user.username as username",
            "user.email as email",
            "user.user_id as user_id",
            "user.phone_number as phone_number",
        ]).getRawOne();
        if (!order || !user) {
            return order;
        }
        order.user = { ...order.user, ...user };
        return order;
    },
    getOrdersByUserId: async (em, user_id) => {
        return await em.getRepository(order_1.Order).find({
            order: { order_date: "DESC" },
            relations: [
                "order_items",
                "order_items.item",
                "order_items.item.images",
                "discount",
                "address",
            ],
            withDeleted: true,
            where: { user: { user_id } },
        });
    },
    placeOrder: async (em, data) => {
        const cartItems = await em.getRepository(item_cart_1.ItemCart).find({
            relations: ["item"],
            where: { user: { user_id: data.user_id } },
        });
        if (cartItems.length === 0) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, "Cart is empty");
        }
        let subtotal = 0;
        cartItems.forEach((cartItem) => {
            subtotal += cartItem.item.item_price * cartItem.quantity;
        });
        let total_amount = subtotal;
        let appliedDiscount = null;
        if (data.discount_id) {
            appliedDiscount = await em.getRepository(discount_1.Discount).findOne({
                where: { active_flag: 1, discount_id: data.discount_id },
            });
            if (appliedDiscount) {
                if (appliedDiscount.discount_type === "percentage") {
                    total_amount =
                        subtotal -
                            (subtotal * (appliedDiscount.discount_amount ?? 0)) / 100;
                }
                else {
                    total_amount = subtotal - (appliedDiscount.discount_amount ?? 0);
                }
            }
        }
        for (const cartItem of cartItems) {
            const item = cartItem.item;
            if (item.stock < cartItem.quantity) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, `Insufficient stock for item: ${item.item_name}`);
            }
            item.stock -= cartItem.quantity;
            await em.getRepository(item_1.Item).save(item);
        }
        const order = em.create(order_1.Order, {
            address: data.address_id ? { address_id: data.address_id } : undefined,
            delivery_status: "pending",
            discount: appliedDiscount
                ? { discount_id: appliedDiscount.discount_id }
                : undefined,
            payment_method: data.payment_method,
            payment_status: "pending",
            status: "pending",
            subtotal,
            total_amount,
            user: { user_id: data.user_id },
        });
        const savedOrder = await em.save(order_1.Order, order);
        const orderItems = cartItems.map((cartItem) => {
            return em.create(order_items_1.OrderItems, {
                item: { item_id: cartItem.item.item_id },
                item_purchase_price: cartItem.item.item_price,
                item_quantity: cartItem.quantity,
                order: { order_id: savedOrder.order_id },
            });
        });
        await em.getRepository(order_items_1.OrderItems).save(orderItems);
        await em
            .getRepository(item_cart_1.ItemCart)
            .delete({ user: { user_id: data.user_id } });
        return savedOrder.order_id;
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
    wrapTransaction: transaction_1.wrapTransaction,
};
