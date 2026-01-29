"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUserController = exports.LoginUserController = void 0;
const login_usecase_1 = require("../../../application/useCases/auth/login.usecase");
const logout_usecase_1 = require("../../../application/useCases/auth/logout.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const LoginUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        const credentials = req.body;
        const { token, user } = await (0, login_usecase_1.loginUser)(t, credentials, AuthRepo);
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
        });
        res.cookie("expIn", (token.expIN || "").toString(), {
            httpOnly: false,
            sameSite: "lax",
            secure: false,
        });
        const userProfile = {
            email: user.email,
            phone_number: user.phone_number,
            profile_image: user.profile_image,
            user_id: user.user_id,
            username: user.username,
            wishlist_name: user.wishlist_name
        };
        (0, displaymessage_1.successmessage)(res, "User logged in successfully", userProfile);
    });
};
exports.LoginUserController = LoginUserController;
const LogoutUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        const token = req.cookies.accessToken;
        if (!token)
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        await (0, logout_usecase_1.logoutUser)(t, token, AuthRepo);
        res.clearCookie("accessToken");
        (0, displaymessage_1.successmessage)(res, "User logged Out successfully");
    });
};
exports.LogoutUserController = LogoutUserController;
