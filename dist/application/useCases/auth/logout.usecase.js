"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const logoutUser = async (entitiesmanager, token, authRepo) => {
    const payload = await (0, TokenGenerator_1.verifyToken)(token);
    await authRepo.removeRefreshToken(entitiesmanager, payload.id);
};
exports.logoutUser = logoutUser;
