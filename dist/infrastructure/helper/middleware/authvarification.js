"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerification = void 0;
const User_models_1 = require("../../../domain/models/User.models");
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const GlobelErrorHandler_1 = require("./GlobelErrorHandler");
const authVerification = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.UNAUTHORIZED, "Invalid access token");
        }
        const payload = (0, TokenGenerator_1.verifyToken)(token);
        const userRole = payload.role;
        req.body = { ...req.body, user: payload };
        if (allowedRoles && userRole !== User_models_1.UserRole.ADMIN && !allowedRoles.includes(userRole)) {
            throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.FORBIDDEN, "Permission denied: You do not have the required role to access this resource");
        }
        next();
    };
};
exports.authVerification = authVerification;
