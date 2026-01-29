"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const ormconfig_1 = require("../../../infrastructure/orm/config/ormconfig");
const loginUser = async (entitiesmanager, credentials, authRepo) => {
    const user = await authRepo.FindUser(entitiesmanager, credentials);
    if (user) {
        const isMatch = await bcrypt_1.default.compare(credentials.password, user.password);
        if (isMatch) {
            const token = (0, TokenGenerator_1.genrateToken)({ id: user.user_id, role: credentials.role });
            const refreshTokenHash = await bcrypt_1.default.hash(token.refreshToken, ormconfig_1.Envvar.PassWordSalt);
            await authRepo.saveRefreshToken(entitiesmanager, { id: user.user_id, refreshToken: refreshTokenHash });
            return { token, user };
        }
        else {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, 'Invalid credentials');
        }
    }
    else {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.NOT_FOUND, 'User not found');
    }
};
exports.loginUser = loginUser;
