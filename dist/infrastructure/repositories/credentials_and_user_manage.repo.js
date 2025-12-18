"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAndCredentialsRepo = void 0;
const user_1 = require("../orm/entities/user");
const transaction_1 = require("../helper/transaction");
const typeorm_1 = require("typeorm");
exports.UserAndCredentialsRepo = {
    updateUser: async (entitiesManager, userProfile) => {
        const userToUpdate = await entitiesManager.findOne(user_1.User, { where: { user_id: userProfile.user_id } });
        if (userToUpdate) {
            Object.assign(userToUpdate, userProfile);
            await entitiesManager.save(userToUpdate).then((res) => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
        return false;
    },
    deleteUser: async (entitiesmanager, id) => {
        await entitiesmanager.delete(user_1.User, { user_id: id }).then((res) => {
            return true;
        }).catch((err) => {
            return false;
        });
        return false;
    },
    saveUser: async (entitiesmanager, UserserCredentials) => {
        const user = entitiesmanager.create(user_1.User, {
            username: UserserCredentials.username,
            password: UserserCredentials.password,
            email: UserserCredentials.email,
            phone_number: UserserCredentials.phone_number,
        });
        return await entitiesmanager.save(user);
    },
    getUser: async (entitiesmanager, id) => {
        return await entitiesmanager
            .getRepository(user_1.User)
            .findOne({ where: { user_id: id } });
    },
    checkUserExists: async (entitiesmanager, criteria, avoid) => {
        const qb = await entitiesmanager
            .getRepository(user_1.User)
            .createQueryBuilder("user")
            .where(new typeorm_1.Brackets(qb => {
            qb.where("user.username = :username", { username: criteria.username })
                .orWhere("user.email = :email", { email: criteria.email })
                .orWhere("user.phone_number = :phone", { phone: criteria.phone_number });
        }));
        console.log(avoid);
        if (avoid)
            qb.andWhere("user.user_id != :avoid", { avoid: avoid });
        const user = await qb.getOne();
        if (!user) {
            return { username: '', email: '', phone_number: 0 };
        }
        else {
            return { username: user.username, email: user.email, phone_number: user.phone_number };
        }
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
