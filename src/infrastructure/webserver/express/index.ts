import 'reflect-metadata';
import express,{Express} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import cookieParser from "cookie-parser";
import passport from '../../helper/passportStrategy';
import {createRoutes} from './routes';
import {AppDataSource ,Envvar} from '../../orm/config/ormconfig';
import {logger} from '../../helper/logger'
// import { swaggerUi, swaggerSpec } from "../../../swagger/swagger";
import swaggerDocument from '../../../../api-docs/_openapi.json' ;
import { GlobelErrorHandler } from '../../helper/middleware/GlobelErrorHandler';
import { createLoggerInstance } from '../../helper/logger';
import { HttpError } from '../../helper/httpError';
import { StatusCodes } from '../../config/constants';
export const app = express();

createLoggerInstance();

AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
}).catch((err) => {
    console.error('Error during Data Source initialization', err);
});
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']  
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('',createRoutes())
app.use(GlobelErrorHandler)
const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

setupSwagger(app);
app.use((req,res,next)=>{
  const notFoundError= new HttpError({
    statusCode:StatusCodes.NOT_FOUND,
    message:{
      tag : "Endpoint not found",
    }
  })
  GlobelErrorHandler(notFoundError,req,res,next)
})

app.listen(5000, () => logger.info('Server running on port 5000 http://localhost:5000/api-docs'));


