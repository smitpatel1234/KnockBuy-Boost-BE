import express from "express";
import path from "path";

import addressRouter from "../../../interface/routes/address.routes";
import authRouter from "../../../interface/routes/auth.routes";
import categoryRouter from "../../../interface/routes/category.routes";
import discountRouter from "../../../interface/routes/discount.routes";
import itemsRouter from "../../../interface/routes/item.routes";
import itemcartRoute from "../../../interface/routes/itemcart.routes";
import orderRoute from "../../../interface/routes/order.routes"
import uploadsRouter from "../../../interface/routes/upload.routes";
import userRouter from "../../../interface/routes/user.routes";
import variantRouter from "../../../interface/routes/variant.routes";
export const createRoutes = (): express.Router => {
  const router = express.Router();
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/variant", variantRouter);
  router.use("", uploadsRouter);
  router.use("/category", categoryRouter);
  router.use("/uploads",express.static(path.join(__dirname, "../../../../uploads")));
  router.use("/item", itemsRouter);
  router.use("/address", addressRouter);
  router.use("/discount", discountRouter);
  router.use("/itemcart", itemcartRoute);
  router.use("/order",orderRoute);
  return router;
};
