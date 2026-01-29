"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallUserPage = void 0;
const getallUserPage = async (t, userRepo, data) => {
    return await userRepo.getallUserPage(t, data);
};
exports.getallUserPage = getallUserPage;
