"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepo = void 0;
const user_1 = require("../orm/entities/user");
const transaction_1 = require("../helper/transaction");
exports.AuthRepo = {
    FindUser: async (t, credentials) => {
        return await t
            .getRepository(user_1.User)
            .findOne({
            where: [
                { username: credentials.identifier },
                { email: credentials.identifier },
                { phone_number: credentials.identifier },
            ],
        });
    },
    saveRefreshToken: async (t, { id, refreshToken }) => {
        await t
            .getRepository(user_1.User)
            .update({ user_id: id }, { refresh_token: refreshToken });
    },
    removeRefreshToken: async (t, id) => {
        await t
            .getRepository(user_1.User)
            .update({ user_id: id }, { refresh_token: null });
    },
    findRefreshTokenHash: async (t, id) => {
        const user = await t
            .getRepository(user_1.User)
            .findOne({ where: { user_id: id } });
        return user?.refresh_token ? user.refresh_token : null;
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
