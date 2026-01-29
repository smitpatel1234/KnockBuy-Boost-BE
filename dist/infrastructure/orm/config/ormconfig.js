"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.Envvar = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../helper/env/index");
exports.Envvar = {
    database: process.env.NODE_ENV === 'test' ? 'e_commerce_test' : index_1.ENV.DB_NAME,
    dbhost: index_1.ENV.DB_HOST,
    dbpassword: index_1.ENV.DB_PASSWORD,
    dbport: index_1.ENV.DB_PORT,
    dbtype: index_1.ENV.DB_TYPE,
    dbusername: index_1.ENV.DB_USER,
    PassWordSalt: index_1.ENV.PassWordSalt,
    server_port: index_1.ENV.SERVER_PORT
};
exports.AppDataSource = new typeorm_1.DataSource({
    database: exports.Envvar.database,
    entities: [__dirname + '/../entities/*{.ts,.js}'],
    host: exports.Envvar.dbhost,
    logging: true,
    password: exports.Envvar.dbpassword,
    port: exports.Envvar.dbport,
    synchronize: true,
    timezone: 'Z',
    type: 'mysql',
    username: exports.Envvar.dbusername,
});
