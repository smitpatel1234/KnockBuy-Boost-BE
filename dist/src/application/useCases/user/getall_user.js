"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallUser = void 0;
const getallUser = (userRepo) => {
    return async (t) => {
        return await userRepo.getallUser(t);
    };
};
exports.getallUser = getallUser;
