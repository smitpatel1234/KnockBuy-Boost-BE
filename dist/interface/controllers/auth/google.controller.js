"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserInGoogleController = void 0;
const google_login_usecase_1 = require("../../../application/useCases/auth/google-login.usecase");
const LoginUserInGoogleController = (AuthRepo) => {
    return async (req, res) => {
        AuthRepo.wrapTransaction(async (t) => {
            await (0, google_login_usecase_1.loginUserInGoogle)(t, AuthRepo, req.user);
        });
    };
};
exports.LoginUserInGoogleController = LoginUserInGoogleController;
