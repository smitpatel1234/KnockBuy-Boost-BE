"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUserController = exports.LoginUserController = void 0;
const constants_1 = require("../../../infrastructure/config/constants");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const login_usecase_1 = require("../../../application/useCases/auth/login.usecase");
const logout_usecase_1 = require("../../../application/useCases/auth/logout.usecase");
const LoginUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        const credentials = req.body;
        await (0, login_usecase_1.loginUser)(t, credentials, AuthRepo).then((token) => {
            res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'lax' });
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.OK, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.LoginUserController = LoginUserController;
const LogoutUserController = (AuthRepo) => {
    return async (req, res) => AuthRepo.wrapTransaction(async (t) => {
        await (0, logout_usecase_1.logoutUser)(t, req.cookies.accessToken, AuthRepo).then((token) => {
            res.clearCookie('accessToken');
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.OK, res, ["Logged out successfully"]);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.LogoutUserController = LogoutUserController;
