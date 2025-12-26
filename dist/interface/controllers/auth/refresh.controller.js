"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const refresh_usecase_1 = require("../../../application/useCases/auth/refresh.usecase");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const refreshTokenController = (Authrepo) => {
    return async (req, res) => Authrepo.wrapTransaction(async (t) => {
        const refrehToken = await req.cookies.refreshToken;
        const authToken = await req.cookies.accessToken;
        const payload = (await (0, TokenGenerator_1.decodedToken)(authToken));
        const user_id = payload.id;
        const tokenvalues = await (0, refresh_usecase_1.refreshToken)(t, Authrepo, refrehToken, user_id);
        if (!tokenvalues) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        }
        res.cookie("accessToken", tokenvalues.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });
        res.cookie("refreshToken", tokenvalues.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.cookie("expIn", tokenvalues.expIN, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
        });
        return (0, displaymessage_1.successmessage)(res, "token is refreshed");
    });
};
exports.refreshTokenController = refreshTokenController;
