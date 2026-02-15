"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_id_schema = exports.userProfile = exports.phoneNumberAsIdentifier = exports.emailAsIdentifier = exports.UsernameAsIdentifier = exports.userCredentials = exports.PhoneField = exports.EmailField = exports.PasswordField = exports.UsernameField = exports.IdField = void 0;
const zod_1 = require("zod");
exports.IdField = zod_1.z.string();
exports.UsernameField = zod_1.z.string()
    .max(50)
    .min(3)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/, "Invalid username");
exports.PasswordField = zod_1.z.string()
    .max(50)
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-&!])[A-Za-z\d-&!]{8,}$/, "Invalid password");
exports.EmailField = zod_1.z.email();
exports.PhoneField = zod_1.z.string().regex(/^[0-9]{10}$/, "Invalid phone number");
exports.userCredentials = zod_1.z.object({
    email: exports.EmailField,
    password: exports.PasswordField,
    phone_number: exports.PhoneField,
    username: exports.UsernameField,
});
exports.UsernameAsIdentifier = zod_1.z.object({ username: exports.UsernameField });
exports.emailAsIdentifier = zod_1.z.object({ email: exports.EmailField });
exports.phoneNumberAsIdentifier = zod_1.z.object({ phone_number: exports.PhoneField });
exports.userProfile = zod_1.z.object({
    email: exports.EmailField,
    phone_number: exports.PhoneField,
    profile_image: zod_1.z.string().optional(),
    user_id: exports.IdField.optional(),
    username: exports.UsernameField,
    wishlist_name: zod_1.z.string().max(100).optional()
});
exports.user_id_schema = zod_1.z.object({
    user_id: exports.IdField
});
