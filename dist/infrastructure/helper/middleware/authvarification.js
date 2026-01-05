"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerification = void 0;
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const GlobelErrorHandler_1 = require("./GlobelErrorHandler");
const logger_1 = require("../logger");
const User_models_1 = require("../../../domain/models/User.models");
const authVerification = (allowedRoles) => {
    return async (req, res, next) => {
        console.log("Auth verification middleware called", req.params.id);
        const token = req.cookies.accessToken;
        if (!token) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        }
        const payload = await (0, TokenGenerator_1.verifyToken)(token);
        if (payload) {
            const userRole = payload.role;
            if (allowedRoles && userRole !== User_models_1.UserRole.ADMIN && !allowedRoles.includes(userRole)) {
                throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.FORBIDDEN, "Permission denied: You do not have the required role to access this resource");
            }
            req.body = { ...req.body, user: payload };
            logger_1.logger.info(req.cookies.accessToken, req.body);
            next();
        }
    };
};
exports.authVerification = authVerification;
