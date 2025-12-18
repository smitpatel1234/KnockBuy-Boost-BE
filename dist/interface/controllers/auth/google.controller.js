"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserInGoogleController = void 0;
const constants_1 = require("../../../infrastructure/config/constants");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const google_login_usecase_1 = require("../../../application/useCases/auth/google-login.usecase");
const LoginUserInGoogleController = (AuthRepo) => {
    return async (req, res) => {
        AuthRepo.wrapTransaction(async (t) => {
            await (0, google_login_usecase_1.loginUserInGoogle)(t, AuthRepo, req.user);
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.OK, res, ["Google login successful"]);
        });
    };
};
exports.LoginUserInGoogleController = LoginUserInGoogleController;
