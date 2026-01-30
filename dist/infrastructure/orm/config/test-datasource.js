"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataSource = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
exports.TestDataSource = new typeorm_1.DataSource({
    database: 'e_commerce_test', // Overriding database name for testing
    entities: [__dirname + '/../entities/*{.ts,.js}'],
    host: ormconfig_1.Envvar.dbhost,
    // logging: false, // Disable logging for cleaner test output
    password: ormconfig_1.Envvar.dbpassword,
    port: ormconfig_1.Envvar.dbport,
    synchronize: true, // Auto sync schema for tests
    timezone: 'Z',
    type: 'mysql',
    username: ormconfig_1.Envvar.dbusername,
});
