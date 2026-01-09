"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const refresh_usecase_1 = require("../../../application/useCases/auth/refresh.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const refreshTokenController = (Authrepo) => {
    return async (req, res) => Authrepo.wrapTransaction(async (t) => {
        const refrehToken = req.cookies.refreshToken;
        if (!refrehToken) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Refresh token missing");
        }
        const payload = (0, TokenGenerator_1.decodedToken)(refrehToken);
        if (!payload.id) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid refresh token");
        }
        const user_id = payload.id;
        const tokenvalues = await (0, refresh_usecase_1.refreshToken)(t, Authrepo, refrehToken, user_id);
        if (!tokenvalues) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Token refresh failed");
        }
        res.cookie("accessToken", tokenvalues.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });
        res.cookie("expIn", tokenvalues.expIN, {
            httpOnly: false,
            sameSite: "lax",
            secure: true,
        });
        (0, displaymessage_1.successmessage)(res, "token is refreshed");
    });
};
exports.refreshTokenController = refreshTokenController;
