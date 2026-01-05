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
        const { token, user } = await (0, login_usecase_1.loginUser)(t, credentials, AuthRepo);
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        res.cookie("expIn", (token.expIN || "").toString(), {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
        });
        const userProfile = {
            username: user.username,
            phone_number: user.phone_number,
            profile_image: user.profile_image,
            email: user.email,
            wishlist_name: user.wishlist_name,
            user_id: user.user_id
        };
        return (0, displaymessage_1.successmessage)(res, "User logged in successfully", userProfile);
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
