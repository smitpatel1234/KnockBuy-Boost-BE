"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.Envvar = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../helper/env/index");
exports.Envvar = {
    server_port: index_1.ENV.SERVER_PORT,
    dbtype: index_1.ENV.DB_TYPE,
    dbhost: index_1.ENV.DB_HOST,
    dbport: index_1.ENV.DB_PORT,
    dbusername: index_1.ENV.DB_USER,
    dbpassword: index_1.ENV.DB_PASSWORD,
    database: index_1.ENV.DB_NAME,
    PassWordSalt: index_1.ENV.PassWordSalt
};
console.log("Envvar >>>>", exports.Envvar);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: exports.Envvar.dbhost,
    port: exports.Envvar.dbport,
    username: exports.Envvar.dbusername,
    password: exports.Envvar.dbpassword,
    database: exports.Envvar.database,
    synchronize: false,
    // dropSchema:true,
    logging: true,
    timezone: 'Z',
    entities: [__dirname + '/../entities/*{.ts,.js}'],
});
