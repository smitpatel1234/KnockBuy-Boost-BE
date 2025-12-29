import express from 'express';
import authRouter from '../../../interface/routes/auth.routes';
import userRouter from '../../../interface/routes/user.routes';
import variantRouter from '../../../interface/routes/variant.routes';
import uploadsRouter from '../../../interface/routes/upload.routes';
import categoryRouter from '../../../interface/routes/category.routes';
import itemsRouter from '../../../interface/routes/item.routes'
import addressRouter from '../../../interface/routes/address.routes'
import path from 'path';
import discountRouter from '../../../interface/routes/discount.routes';

export const createRoutes = (): express.Router => {
  const router = express.Router();
  router.use('/auth', authRouter)
  router.use('/user', userRouter)
  router.use('/variant', variantRouter)
  router.use('', uploadsRouter)
  router.use('/category', categoryRouter)
  router.use(
    "/uploads",
    express.static(path.join(__dirname, "../../../../uploads"))
  );
  router.use('/item', itemsRouter)
  router.use('/address', addressRouter)
  router.use('/discount', discountRouter)
  return router;
}