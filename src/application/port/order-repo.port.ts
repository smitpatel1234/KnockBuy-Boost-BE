import { EntityManager } from "typeorm";

import { pageParams, PaginationResponse } from "../../domain/globalTypes/commonFields";
import { OrderAllType, PlaceOrder, UpdateOrderModel } from "../../domain/models/order.models"
export interface OrderRepoPort {
     DeleteOrder: (em: EntityManager, order_id: string) => Promise<boolean>;
     GetAllOrdersPage: (em: EntityManager, data: pageParams) => Promise<PaginationResponse<OrderAllType>>;
     getOrderById: (em: EntityManager, order_id: string) => Promise<OrderAllType>;
     getOrdersByUserId: (em: EntityManager, user_id: string) => Promise<OrderAllType[]>;
     placeOrder: (em: EntityManager, order: PlaceOrder) => Promise<string>;
     UpdateOrder: (em: EntityManager, data: UpdateOrderModel) => Promise<boolean>;
     wrapTransaction: (fn: (em: EntityManager) => Promise<OrderAllType>) => Promise<OrderAllType>;
}