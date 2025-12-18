"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const index_1 = require("./env/index");
const ENV_VARS = {
    Client_ID: index_1.ENV.Client_ID,
    Client_secret: index_1.ENV.Client_secret,
};
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: ENV_VARS.Client_ID,
    clientSecret: ENV_VARS.Client_secret,
    callbackURL: "http://localhost:5000/auth/google/callback",
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        console.log("Google profile:", profile);
        // Return the full profile object
        return cb(null, profile);
    }
    catch (error) {
        return cb(error);
    }
}));
// Serialize user for session
passport_1.default.serializeUser((user, cb) => {
    cb(null, user);
});
// Deserialize user from session
passport_1.default.deserializeUser((user, cb) => {
    cb(null, user);
});
exports.default = passport_1.default;
