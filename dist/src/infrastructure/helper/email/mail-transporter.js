"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = require("../env/index");
exports.transporter = nodemailer_1.default.createTransport({
    auth: {
        pass: index_1.ENV.EMAIL_PASSWORD,
        user: index_1.ENV.USER_EMAIL,
    },
    host: index_1.ENV.SMTP_HOST,
    port: 465,
    secure: true,
    service: index_1.ENV.MAIL_SERVICE,
});
