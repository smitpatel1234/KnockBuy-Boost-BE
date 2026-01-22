import express from "express";

import { UserRole } from "../../domain/models/User.models";
import { PlaceOrderSchema } from "../../domain/schemas/order"
import { authVerification } from "../../infrastructure/helper/middleware/authvarification";
import { validateDetails } from "../../infrastructure/helper/validator";
import { ItemCartRepo } from "../../infrastructure/repositories/itemcart.repo";
import { OrderRepo } from "../../infrastructure/repositories/order.repo";
import { ConfirmOrderController } from "../controllers/order/confirmOrder.controller";
import { DeleteOrderController } from "../controllers/order/deleteOrder.controller";
import { GetAllOrdersPageController } from "../controllers/order/getAllOrdersPage.controller";
import { GetOrderController } from "../controllers/order/getOrder.controller";
import { GetOrdersByUserIdController } from "../controllers/order/getOrdersByUserId.controller";
import {
   PlaceorderController
} from "../controllers/order/placeorder.controller"
import { UpdateOrderController } from "../controllers/order/updateOrder.controller";

const router = express.Router();

router.post('/placeorder', authVerification([UserRole.USER]), validateDetails(PlaceOrderSchema), PlaceorderController(OrderRepo, ItemCartRepo));
router.post('/confirm/:id', authVerification([UserRole.USER]), ConfirmOrderController(OrderRepo));
router.get('/history', authVerification([UserRole.USER, UserRole.ADMIN]), GetOrdersByUserIdController(OrderRepo));
router.get('/get-order/:id', authVerification([UserRole.USER, UserRole.ADMIN]), GetOrderController(OrderRepo));

router.post('/', authVerification([UserRole.ADMIN]), GetAllOrdersPageController(OrderRepo));
router.put('/:id', authVerification([UserRole.ADMIN]), UpdateOrderController(OrderRepo));
router.delete('/:id', authVerification([UserRole.ADMIN]), DeleteOrderController(OrderRepo));

export default router;