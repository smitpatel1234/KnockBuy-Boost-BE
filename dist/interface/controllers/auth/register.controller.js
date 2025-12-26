"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = void 0;
const register_usecase_1 = require("../../../application/useCases/auth/register.usecase");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const registerUserController = (UserAndCredentialsRepo) => {
    return async (req, res) => UserAndCredentialsRepo.wrapTransaction(async (t) => {
        const userCredentials = req.body;
        await (0, register_usecase_1.registerUser)(t, userCredentials, UserAndCredentialsRepo);
        return (0, displaymessage_1.successmessage)(res, "User registered successfully");
    });
};
exports.registerUserController = registerUserController;
