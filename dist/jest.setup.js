"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ormconfig_1 = require("./infrastructure/orm/config/ormconfig");
beforeAll(async () => {
    if (!ormconfig_1.AppDataSource.isInitialized) {
        await ormconfig_1.AppDataSource.initialize().then(() => {
            console.log('Data Source has been initialized!');
        });
    }
});
afterAll(async () => {
    if (ormconfig_1.AppDataSource.isInitialized) {
        await ormconfig_1.AppDataSource.destroy();
    }
});
