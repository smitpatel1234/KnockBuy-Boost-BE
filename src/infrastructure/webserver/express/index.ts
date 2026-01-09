import 'reflect-metadata';
import cookieParser from "cookie-parser";
import cors from 'cors';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express'

// import { swaggerUi, swaggerSpec } from "../../../swagger/swagger";
import swaggerDocument from '../../../../api-docs/_openapi.json';
import { StatusCodes } from '../../config/constants';
import { HttpError } from '../../helper/httpError';
import { logger } from '../../helper/logger'
import { createLoggerInstance } from '../../helper/logger';
import { GlobelErrorHandler } from '../../helper/middleware/GlobelErrorHandler';
// import passport from '../../helper/passportStrategy';
import { AppDataSource } from '../../orm/config/ormconfig';
import { createRoutes } from './routes';
export const app = express();

createLoggerInstance();

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((err: unknown) => {
  console.error('Error during Data Source initialization', err);
});
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  origin: 'http://localhost:3000'
}));
app.use(cookieParser());
//app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('', createRoutes())
app.use(GlobelErrorHandler)
const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

setupSwagger(app);
app.use((req, res, next) => {
  const notFoundError = new HttpError({
    message: {
      tag: "Endpoint not found",
    },
    statusCode: StatusCodes.NOT_FOUND
  })
  GlobelErrorHandler(notFoundError, req, res, next)
})

app.listen(5000, () => logger.info('Server running on port 5000 http://localhost:5000/api-docs'));


