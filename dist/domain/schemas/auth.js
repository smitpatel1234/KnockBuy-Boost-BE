"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCredentials = void 0;
const zod_1 = require("zod");
const user_1 = require("./user");
exports.LoginCredentials = zod_1.z.object({
    identifier: zod_1.z.union([user_1.UsernameField, user_1.PhoneField, user_1.EmailField]),
    role: zod_1.z.enum(["ADMIN", "USER"]),
    password: user_1.PasswordField,
});
