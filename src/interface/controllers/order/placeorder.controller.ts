import Express from "express";
import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../../application/port/itemcart-repo.port";
import { OrderRepoPort } from "../../../application/port/order-repo.port";
import { placeOrder } from "../../../application/useCases/order/placeOrder.usecase";
import { PlaceOrder } from "../../../domain/models/order.models";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const PlaceorderController = (OrderRepo: OrderRepoPort, ItemCartRepo: ItemCartRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    OrderRepo.wrapTransaction(async (t: EntityManager) => {
      const data = req.body as PlaceOrder;
      const user_id = req.body.user.id as string | undefined;

      if (!user_id) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "User not authenticated");
      if (!data.address_id) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Address is required");
      if (!data.payment_method) throw new ApplicationError(ApplicationErrorType.BAD_REQUEST, "Payment method is required");

      const placeorderparams = {
        address_id: data.address_id,
        discount_id: data.discount_id,
        payment_method: data.payment_method,
        user_id: user_id,
      };

      const order_id = await placeOrder(t, OrderRepo, ItemCartRepo, placeorderparams);
      successmessage(res, "Order placed successfully", { order_id });
    });
};
