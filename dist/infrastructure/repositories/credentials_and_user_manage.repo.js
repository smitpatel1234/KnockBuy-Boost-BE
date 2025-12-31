"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAndCredentialsRepo = void 0;
const user_1 = require("../orm/entities/user");
const transaction_1 = require("../helper/transaction");
const typeorm_1 = require("typeorm");
const pagination_helper_1 = require("../helper/pagination.helper");
exports.UserAndCredentialsRepo = {
    getallUser: async (entitiesManager) => {
        return await entitiesManager
            .getRepository(user_1.User)
            .find({
            select: ["user_id", "username", "email", "phone_number", "addresses"],
            relations: ["addresses"],
        });
    },
    updateUser: async (entitiesManager, userProfile) => {
        const userToUpdate = await entitiesManager.findOne(user_1.User, {
            where: { user_id: userProfile.user_id },
        });
        if (userToUpdate) {
            Object.assign(userToUpdate, userProfile);
            await entitiesManager.save(userToUpdate);
            return true;
        }
        return false;
    },
    deleteUser: async (entitiesmanager, id) => {
        const res = await entitiesmanager.softDelete(user_1.User, { user_id: id });
        return (res.affected ?? 0) > 0;
    },
    saveUser: async (entitiesmanager, UserserCredentials) => {
        const user = entitiesmanager.create(user_1.User, {
            username: UserserCredentials.username,
            password: UserserCredentials.password,
            email: UserserCredentials.email,
            phone_number: UserserCredentials.phone_number,
            role: "USER",
        });
        return await entitiesmanager.save(user);
    },
    getUser: async (entitiesmanager, id) => {
        return await entitiesmanager
            .getRepository(user_1.User)
            .findOne({
            where: { user_id: id },
            select: ["user_id", "username", "email", "phone_number", "addresses", "wishlist_name", "profile_image"],
            relations: ["addresses"],
        });
    },
    checkUserExists: async (entitiesmanager, criteria, avoid) => {
        const qb = await entitiesmanager
            .getRepository(user_1.User)
            .createQueryBuilder("user")
            .where(new typeorm_1.Brackets((qb) => {
            qb.where("user.username = :username", { username: criteria.username })
                .orWhere("user.email = :email", { email: criteria.email })
                .orWhere("user.phone_number = :phone", {
                phone: criteria.phone_number,
            });
        }));
        if (avoid)
            qb.andWhere("user.user_id != :avoid", { avoid: avoid });
        const user = await qb.getOne();
        if (!user) {
            return { username: "", email: "", phone_number: 0 };
        }
        else {
            return {
                username: user.username,
                email: user.email,
                phone_number: user.phone_number,
            };
        }
    },
    getallUserPage: async (entityManager, data) => {
        const userQB = entityManager.getRepository(user_1.User).createQueryBuilder("user");
        userQB.select(["user.user_id", "user.username", "user.email", "user.phone_number"]);
        return (0, pagination_helper_1.applyPaginationAndFilters)(userQB, data, false);
    },
    wrapTransaction: transaction_1.wrapTransaction,
};
