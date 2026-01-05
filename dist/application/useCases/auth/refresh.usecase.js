"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const refreshToken = async (entitiesmanager, authRepo, refrehToken, user_id) => {
    const tokenhash = await authRepo.findRefreshTokenHash(entitiesmanager, user_id);
    if (tokenhash) {
        const isMatch = bcrypt_1.default.compareSync(refrehToken, tokenhash);
        if (isMatch) {
            const tokens = await (0, TokenGenerator_1.regenerateToken)(refrehToken);
            return {
                accessToken: tokens.accesstoken,
                expIN: tokens.expIN
            };
        }
        else {
            throw new Error("Invalid token");
        }
    }
};
exports.refreshToken = refreshToken;
