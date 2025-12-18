import {DataSource} from 'typeorm';
import {ENV} from '../../helper/env/index';
import { User } from '../../orm/entities/user';
import { Address } from '../../orm/entities/address';
export const Envvar={
    server_port: ENV.SERVER_PORT,
    dbtype: ENV.DB_TYPE ,
    dbhost: ENV.DB_HOST,
    dbport: ENV.DB_PORT,
    dbusername: ENV.DB_USER,
    dbpassword: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    PassWordSalt: ENV.PassWordSalt
}
export const AppDataSource = new DataSource({
     type: 'mysql' ,
    host: Envvar.dbhost,
    port: Envvar.dbport,
    username: Envvar.dbusername,
    password: Envvar.dbpassword,
    database: Envvar.database,
    synchronize: true,
    dropSchema:true,
    logging:true,
    timezone: 'Z',
    entities: [__dirname + '/../entities/*{.ts,.js}'],
})
