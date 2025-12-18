"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = void 0;
const constants_1 = require("../../../infrastructure/config/constants");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const register_usecase_1 = require("../../../application/useCases/auth/register.usecase");
const registerUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const userCredentials = req.body;
        await (0, register_usecase_1.registerUser)(t, userCredentials, UserAndCredentialsRepo).then(() => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.CREATED, res);
        }).catch((err) => {
            (0, displaymessage_1.displaymessage)(constants_1.constants.Code.INTERNAL_SERVER_ERROR, res, [err]);
        });
    });
};
exports.registerUserController = registerUserController;
