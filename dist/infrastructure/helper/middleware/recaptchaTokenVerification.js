"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recaptchaTokenVerification = void 0;
const index_1 = require("../env/index");
const GlobelErrorHandler_1 = require("./GlobelErrorHandler");
const recaptchaTokenVerification = () => {
    return async (req, res, next) => {
        if (process.env.NODE_ENV === 'test') {
            next();
            return;
        }
        const token = req.body.recaptchaToken;
        if (!token) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        }
        const payload = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            body: `secret=${index_1.ENV.RECAPTCHA_SECRET_KEY}&response=${token}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        });
        const result = await payload.json();
        if (!result.success) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Recaptcha verification failed");
        }
        next();
    };
};
exports.recaptchaTokenVerification = recaptchaTokenVerification;
