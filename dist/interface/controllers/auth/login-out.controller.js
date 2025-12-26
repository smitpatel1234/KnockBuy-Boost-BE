"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUserController = exports.LoginUserController = void 0;
const login_usecase_1 = require("../../../application/useCases/auth/login.usecase");
const logout_usecase_1 = require("../../../application/useCases/auth/logout.usecase");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const LoginUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        const credentials = req.body;
        const tokenvalues = await (0, login_usecase_1.loginUser)(t, credentials, AuthRepo);
        res.cookie("accessToken", tokenvalues.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });
        res.cookie("refreshToken", tokenvalues.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.cookie("expIn", tokenvalues.expIN, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
        });
        return (0, displaymessage_1.successmessage)(res, "User logged in successfully");
    });
};
exports.LoginUserController = LoginUserController;
const LogoutUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        if (!req.cookies.accessToken)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        (0, logout_usecase_1.logoutUser)(t, req.cookies.accessToken, AuthRepo);
        res.clearCookie("accessToken");
        return (0, displaymessage_1.successmessage)(res, "User logged Out successfully");
    });
};
exports.LogoutUserController = LogoutUserController;
