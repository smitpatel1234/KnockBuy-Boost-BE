"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapTransaction = void 0;
const ormconfig_1 = require("../orm/config/ormconfig");
const wrapTransaction = async (fun) => {
    return await ormconfig_1.AppDataSource.transaction(async (transactionalEntityManager) => {
        return await fun(transactionalEntityManager);
    });
};
exports.wrapTransaction = wrapTransaction;
