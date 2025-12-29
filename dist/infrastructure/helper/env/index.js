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
    SERVER_PORT: loadAsNumber(process.env.PORT) || 5000,
    DB_HOST: loadAsString(process.env.DB_HOST),
    DB_PORT: loadAsNumber(process.env.DB_PORT),
    DB_NAME: loadAsString(process.env.DB_NAME),
    DB_USER: loadAsString(process.env.DB_USERNAME),
    DB_PASSWORD: loadAsString(process.env.DB_PASSWORD),
    DB_TYPE: loadAsString(process.env.DB_TYPE),
    PassWordSalt: loadAsNumber(process.env.saltRounds) || 10,
    JWT_SECRET: loadAsString(process.env.jwt_secret || 'your-super-secret-jwt-key'),
    JWT_EXPIRESIN: loadAsNumber(process.env.jwt_expiresIn),
    REFRESH_TOKEN_EXPIRESIN: loadAsNumber(process.env.refresh_token_expiresIn),
    Client_secret: loadAsString(process.env.Client_secret),
    Client_ID: loadAsString(process.env.Client_ID),
};
