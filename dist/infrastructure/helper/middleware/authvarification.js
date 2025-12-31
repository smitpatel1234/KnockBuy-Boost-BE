"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerification = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const GlobelErrorHandler_1 = require("./GlobelErrorHandler");
const logger_1 = require("../logger");
const authVerification = () => {
    return async (req, res, next) => {
        console.log(req.body);
        const token = req.cookies.accessToken;
        if (!token) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        }
        const payload = await (0, TokenGenerator_1.verifyToken)(token);
        if (payload) {
            req.body = { ...req.body, user: payload };
            logger_1.logger.info(req.cookies.accessToken, req.body);
            next();
        }
    };
};
exports.authVerification = authVerification;
