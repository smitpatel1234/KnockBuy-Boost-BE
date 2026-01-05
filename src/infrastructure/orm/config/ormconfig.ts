import { DataSource } from 'typeorm';

import { ENV } from '../../helper/env/index';
import { Address } from '../../orm/entities/address';
import { User } from '../../orm/entities/user';
export const Envvar = {
    database: ENV.DB_NAME,
    dbhost: ENV.DB_HOST,
    dbpassword: ENV.DB_PASSWORD,
    dbport: ENV.DB_PORT,
    dbtype: ENV.DB_TYPE,
    dbusername: ENV.DB_USER,
    PassWordSalt: ENV.PassWordSalt,
    server_port: ENV.SERVER_PORT
}
export const AppDataSource = new DataSource({
    database: Envvar.database,
    entities: [__dirname + '/../entities/*{.ts,.js}'],
    host: Envvar.dbhost,
    password: Envvar.dbpassword,
    port: Envvar.dbport,
    synchronize: true,
    // dropSchema:true,
    //logging: true,
    timezone: 'Z',
    type: 'mysql',
    username: Envvar.dbusername,
})
