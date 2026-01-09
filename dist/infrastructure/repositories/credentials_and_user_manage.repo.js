"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAndCredentialsRepo = void 0;
const typeorm_1 = require("typeorm");
const pagination_helper_1 = require("../helper/pagination.helper");
const transaction_1 = require("../helper/transaction");
const user_1 = require("../orm/entities/user");
exports.UserAndCredentialsRepo = {
    checkUserExists: async (entitiesmanager, criteria, avoid) => {
        const qb = entitiesmanager
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
            return { email: "", phone_number: '', username: "" };
        }
        else {
            return {
                email: user.email,
                phone_number: user.phone_number,
                username: user.username,
            };
        }
    },
    deleteUser: async (entitiesmanager, id) => {
        await entitiesmanager.softDelete(user_1.User, { user_id: id });
    },
    getallUser: async (entitiesManager) => {
        return await entitiesManager
            .getRepository(user_1.User)
            .find({
            relations: ["addresses"],
            select: ["user_id", "username", "email", "phone_number", "addresses"],
        });
    },
    getallUserPage: async (entityManager, data) => {
        const userQB = entityManager.getRepository(user_1.User).createQueryBuilder("user");
        userQB.select(["user.user_id", "user.username", "user.email", "user.phone_number"]);
        return (0, pagination_helper_1.applyPaginationAndFilters)(userQB, data, false);
    },
    getUser: async (entitiesmanager, id) => {
        return await entitiesmanager
            .getRepository(user_1.User)
            .findOne({
            relations: ["addresses"],
            select: ["user_id", "username", "email", "phone_number", "addresses", "wishlist_name", "profile_image"],
            where: { user_id: id },
        });
    },
    saveUser: async (entitiesmanager, userCredentials) => {
        const user = entitiesmanager.create(user_1.User, {
            email: userCredentials.email,
            password: userCredentials.password,
            phone_number: userCredentials.phone_number,
            role: "USER",
            username: userCredentials.username,
        });
        return await entitiesmanager.save(user);
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
    wrapTransaction: transaction_1.wrapTransaction,
};
