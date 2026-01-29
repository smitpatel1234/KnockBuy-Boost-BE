"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepo = void 0;
const typeorm_1 = require("typeorm");
const transaction_1 = require("../helper/transaction");
const user_1 = require("../orm/entities/user");
exports.AuthRepo = {
    findRefreshTokenHash: async (t, id) => {
        const user = await t
            .getRepository(user_1.User)
            .findOne({ where: { user_id: id } });
        return user?.refresh_token ?? null;
    },
    FindUser: async (t, credentials) => {
        return await t
            .getRepository(user_1.User)
            .createQueryBuilder("user")
            .where("user.role = :role", { role: credentials.role })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where("user.username = :identifier")
                .orWhere("user.email = :identifier")
                .orWhere("user.phone_number = :identifier");
        }))
            .setParameter("identifier", credentials.identifier)
            .getOne();
    },
    removeRefreshToken: async (t, id) => {
        await t
            .getRepository(user_1.User)
            .update({ user_id: id }, { refresh_token: null });
    },
    saveRefreshToken: async (t, { id, refreshToken }) => {
        await t
            .getRepository(user_1.User)
            .update({ user_id: id }, { refresh_token: refreshToken });
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
