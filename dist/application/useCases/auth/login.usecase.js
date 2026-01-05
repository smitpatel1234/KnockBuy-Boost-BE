"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const ormconfig_1 = require("../../../infrastructure/orm/config/ormconfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (entitiesmanager, credentials, authRepo) => {
    const user = await authRepo.FindUser(entitiesmanager, credentials);
    console.log(user);
    if (user) {
        const isMatch = await bcrypt_1.default.compare(credentials.password, user.password);
        if (isMatch) {
            const token = await (0, TokenGenerator_1.genrateToken)({ id: user.user_id, role: credentials.role });
            const refreshTokenHash = await bcrypt_1.default.hash(token.refreshToken, ormconfig_1.Envvar.PassWordSalt);
            await authRepo.saveRefreshToken(entitiesmanager, { id: user.user_id, refreshToken: refreshTokenHash });
            return { token, user };
        }
        else {
            throw new Error('Invalid credentials');
        }
    }
    else {
        throw new Error('User not found');
    }
};
exports.loginUser = loginUser;
