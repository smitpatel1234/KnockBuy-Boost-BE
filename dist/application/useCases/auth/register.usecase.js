"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ormconfig_1 = require("../../../infrastructure/orm/config/ormconfig");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const registerUser = async (entitiesmanager, userCredentials, userRepo) => {
    const user = await userRepo.checkUserExists(entitiesmanager, userCredentials);
    let error = [];
    if (user.username === userCredentials.username) {
        error.push('Username already exists');
    }
    if (user.email === userCredentials.email) {
        error.push('Email already exists');
    }
    if (user.phone_number === userCredentials.phone_number) {
        error.push('Phone number already exists');
    }
    if (error.length > 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, error.join(', '));
    }
    userCredentials.password = await bcrypt_1.default.hash(userCredentials.password, ormconfig_1.Envvar.PassWordSalt);
    await userRepo.saveUser(entitiesmanager, userCredentials);
};
exports.registerUser = registerUser;
