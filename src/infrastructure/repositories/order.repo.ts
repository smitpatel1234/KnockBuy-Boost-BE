/* eslint-disable max-lines-per-function, max-lines, @typescript-eslint/no-misused-spread */
import { EntityManager } from "typeorm";

import { OrderRepoPort } from "../../application/port/order-repo.port";
import {
  pageParams,
  PaginationResponse,
} from "../../domain/globalTypes/commonFields";
import {
  OrderAllType,
  PlaceOrder,
  UpdateOrderModel,
} from "../../domain/models/order.models";
import { UserProfile } from "../../domain/models/User.models";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../helper/middleware/GlobelErrorHandler";
import { applyPaginationAndFilters } from "../helper/pagination.helper";
import { wrapTransaction } from "../helper/transaction";
import { Address } from "../orm/entities/address";
import { Discount } from "../orm/entities/discount";
import { Item } from "../orm/entities/item";
import { ItemCart } from "../orm/entities/item_cart";
import { Order } from "../orm/entities/order";
import { OrderItems } from "../orm/entities/order_items";
import { User } from "../orm/entities/user";

export const OrderRepo: OrderRepoPort = {
  DeleteOrder: async (
    em: EntityManager,
    order_id: string
  ): Promise<boolean> => {
    const result = await em.getRepository(Order).softDelete(order_id);
    return (result.affected ?? 0) > 0;
  },

  GetAllOrdersPage: async (
    em: EntityManager,
    data: pageParams
  ): Promise<PaginationResponse<OrderAllType>> => {
    const qb = em
      .getRepository(Order)
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
      ]).groupBy('order_id').addOrderBy('order.isNew','DESC');
    const cqb = em.getRepository(Order).createQueryBuilder("order")
    return applyPaginationAndFilters<Order, OrderAllType>(
      qb,
      cqb,
      data,
      [
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
      ]
    );
  },

  getOrderById: async (em: EntityManager, order_id: string) => {
    const order = await em.getRepository(Order).findOne({
      relations: [
        "order_items",
        "order_items.item",
        "order_items.item.images",
        "discount",
        "address",
      ],
      where: { order_id },
      withDeleted: true,
    });
  
    await em.getRepository(Order).update({order_id},{isNew:0});
  
    const user = await em.getRepository(User)
      .createQueryBuilder('user')
      .select([
        "user.username as username",
        "user.email as email",
        "user.user_id as user_id",
        "user.phone_number as phone_number",

      ]).getRawOne<UserProfile>()
    if (!order || !user) {
      return order;
    }
    order.user = { ...order.user, ...user }
    return order;
  },

  getOrdersByUserId: async (em: EntityManager, user_id: string) => {
    return await em.getRepository(Order).find({
      order: { order_date: "DESC" },
      relations: [
        "order_items",
        "order_items.item",
        "order_items.item.images",
        "discount",
        "address",

      ],
      where: { user: { user_id } },
      withDeleted: true,
    });
  },

  placeOrder: async (em: EntityManager, data: PlaceOrder) => {
    const cartItems = await em.getRepository(ItemCart).find({
      relations: ["item"],
      where: { user: { user_id: data.user_id } },
    });

    if (cartItems.length === 0) {
      throw new ApplicationError(
        ApplicationErrorType.NOT_FOUND,
        "Cart is empty"
      );
    }

    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      subtotal += cartItem.item.item_price * cartItem.quantity;
    });

    let total_amount = subtotal;
    let appliedDiscount: Discount | null = null;

    if (data.discount_id) {
      appliedDiscount = await em.getRepository(Discount).findOne({
        where: { active_flag: 1, discount_id: data.discount_id },
      });

      if (appliedDiscount) {
        if (appliedDiscount.discount_type === "percentage") {
          total_amount =
            subtotal -
            (subtotal * (appliedDiscount.discount_amount ?? 0)) / 100;
        } else {
          total_amount = subtotal - (appliedDiscount.discount_amount ?? 0);
        }
      }
    }
    for (const cartItem of cartItems) {
      const item = cartItem.item;
      if (item.stock < cartItem.quantity) {
        throw new ApplicationError(
          ApplicationErrorType.BAD_REQUEST,
          `Insufficient stock for item: ${item.item_name}`
        );
      }
      item.stock -= cartItem.quantity;
      await em.getRepository(Item).save(item);
    }

    const order = em.create(Order, {
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

    const savedOrder = await em.save(Order, order);

    const orderItems: OrderItems[] = cartItems.map((cartItem) => {
      return em.create(OrderItems, {
        item: { item_id: cartItem.item.item_id },
        item_purchase_price: cartItem.item.item_price,
        item_quantity: cartItem.quantity,
        order: { order_id: savedOrder.order_id },
      });
    });

    await em.getRepository(OrderItems).save(orderItems);
    await em
      .getRepository(ItemCart)
      .delete({ user: { user_id: data.user_id } });

    return savedOrder.order_id;
  },

  UpdateOrder: async (
    em: EntityManager,
    data: UpdateOrderModel
  ): Promise<boolean> => {
    const orderRepo = em.getRepository(Order);
    const existing = await orderRepo.findOneBy({ order_id: data.order_id });
    if (!existing) return false;

    if (data.status) existing.status = data.status;
    if (data.delivery_status) existing.delivery_status = data.delivery_status;
    if (data.payment_status) existing.payment_status = data.payment_status;
    if (data.payment_method) existing.payment_method = data.payment_method;
    if (data.address_id)
      existing.address = { address_id: data.address_id } as unknown as Address;

    await orderRepo.save(existing);
    return true;
  },
  wrapTransaction: wrapTransaction,
};
