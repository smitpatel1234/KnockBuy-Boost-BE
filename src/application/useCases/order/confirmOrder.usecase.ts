import { EntityManager } from "typeorm";
import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { UpdateOrderModel } from "../../../domain/models/order.models";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const confirmOrder = async (
    em: EntityManager,
    orderRepo: OrderRepoPort,
    data: { address_id: string; order_id: string; payment_method: string; user_id: string; }
): Promise<boolean> => {
   const userOrders = await orderRepo.getOrdersByUserId(em, data.user_id);
    const order = userOrders.find(o => o.order_id === data.order_id);

    if (!order) {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND, "Order not found or access denied");
    }

    if (order.status === "confirmed" || order.status === "placed") {
        throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Order is already confirmed");
    }

    const updateData: UpdateOrderModel = {
        address_id: data.address_id,
        delivery_status: "pending",
        order_id: data.order_id,
        payment_method: data.payment_method,
        payment_status: data.payment_method === "CASH_ON_DELIVERY" ? "pending" : "paid",
        status: "placed"
    };

    return await orderRepo.UpdateOrder(em, updateData);
};
