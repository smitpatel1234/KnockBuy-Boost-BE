"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallUserPage = void 0;
const getallUserPage = (userRepo) => {
    return async (t, data) => {
        return await userRepo.getallUserPage(t, data);
    };
};
exports.getallUserPage = getallUserPage;
