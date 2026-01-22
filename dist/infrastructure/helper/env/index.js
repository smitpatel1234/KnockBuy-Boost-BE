"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadAsString = (data) => {
    if (!data) {
        return '';
    }
    return data;
};
const loadAsNumber = (data) => {
    if (!data) {
        return 0;
    }
    return Number(data);
};
exports.ENV = {
    Client_ID: loadAsString(process.env.Client_ID),
    Client_secret: loadAsString(process.env.Client_secret),
    DB_HOST: loadAsString(process.env.DB_HOST),
    DB_NAME: loadAsString(process.env.DB_NAME),
    DB_PASSWORD: loadAsString(process.env.DB_PASSWORD),
    DB_PORT: loadAsNumber(process.env.DB_PORT),
    DB_TYPE: loadAsString(process.env.DB_TYPE),
    DB_USER: loadAsString(process.env.DB_USERNAME),
    JWT_EXPIRESIN: loadAsNumber(process.env.jwt_expiresIn),
    JWT_SECRET: loadAsString(process.env.jwt_secret),
    PassWordSalt: loadAsNumber(process.env.saltRounds),
    REFRESH_TOKEN_EXPIRESIN: loadAsNumber(process.env.refresh_token_expiresIn),
    SERVER_PORT: loadAsNumber(process.env.PORT),
    MAIL_SERVICE: loadAsString(process.env.MAIL_SERVICE),
    SMTP_HOST: loadAsString(process.env.SMTP_HOST),
    USER_EMAIL: loadAsString(process.env.USER_EMAIL),
    EMAIL_PASSWORD: loadAsString(process.env.EMAIL_PASSWORD),
    COMPANY_NAME: loadAsString(process.env.COMPANY_NAME),
};
