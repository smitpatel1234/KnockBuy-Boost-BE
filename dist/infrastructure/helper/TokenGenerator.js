"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateToken = exports.decodedToken = exports.verifyToken = exports.genrateToken = exports.Envvar = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../helper/env/index");
const GlobelErrorHandler_1 = require("./middleware/GlobelErrorHandler");
exports.Envvar = {
    PassWordSalt: index_1.ENV.PassWordSalt,
    JWT_SECRET: index_1.ENV.JWT_SECRET,
    JWT_EXPIRESIN: index_1.ENV.JWT_EXPIRESIN,
    REFRESH_TOKEN_EXPIRESIN: index_1.ENV.REFRESH_TOKEN_EXPIRESIN,
};
const accessTokengenrator = async (payload) => {
    return await jsonwebtoken_1.default.sign(payload, exports.Envvar.JWT_SECRET, {
        algorithm: 'HS512',
        expiresIn: exports.Envvar.JWT_EXPIRESIN,
    });
};
const refreshTokengenrator = async (payload) => {
    return await jsonwebtoken_1.default.sign(payload, exports.Envvar.JWT_SECRET, {
        algorithm: 'HS512',
        expiresIn: exports.Envvar.REFRESH_TOKEN_EXPIRESIN,
    });
};
const genrateToken = async (payload) => {
    const token = await accessTokengenrator(payload);
    const decoded = await (0, exports.verifyToken)(token);
    const token_refreshToken = await refreshTokengenrator(payload);
    return { accessToken: token, refreshToken: token_refreshToken, expIN: decoded.exp };
};
exports.genrateToken = genrateToken;
const verifyToken = async (token) => {
    try {
        const decoded = await jsonwebtoken_1.default.verify(token, exports.Envvar.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
    }
};
exports.verifyToken = verifyToken;
const decodedToken = async (token) => {
    try {
        const decoded = await jsonwebtoken_1.default.decode(token);
        return decoded;
    }
    catch (error) {
        return new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
    }
};
exports.decodedToken = decodedToken;
const regenerateToken = async (refresh_token) => {
    try {
        const decoded = (await jsonwebtoken_1.default.verify(refresh_token, exports.Envvar.JWT_SECRET));
        const { iat, exp, ...newPayload } = decoded;
        const newToken = await accessTokengenrator(newPayload);
        const decoded1 = (await (0, exports.decodedToken)(newToken));
        if (!decoded1)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
        return {
            accesstoken: newToken,
            expIN: decoded1.exp
        };
    }
    catch (error) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
    }
};
exports.regenerateToken = regenerateToken;
