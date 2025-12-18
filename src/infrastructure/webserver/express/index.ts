import 'reflect-metadata';
import express,{Express} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import cookieParser from "cookie-parser";
import passport from '../../helper/passportStrategy';


import {AppDataSource ,Envvar} from '../../orm/config/ormconfig';
// import { swaggerUi, swaggerSpec } from "../../../swagger/swagger";
import swaggerDocument from '../../../../api-docs/_openapi.json' ;
import  authRouter  from '../../../interface/routes/auth.routes';
import userRouter  from '../../../interface/routes/user.routes';
import variantRouter from '../../../interface/routes/variant.routes';
export const app = express();
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
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/variant',variantRouter)
const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

setupSwagger(app);
app.listen(5000, () => console.log('Server running on port 5000 http://localhost:5000/api-docs'));


