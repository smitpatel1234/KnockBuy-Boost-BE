"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerification = void 0;
const constants_1 = require("../../config/constants");
const TokenGenerator_1 = require("../../../infrastructure/helper/TokenGenerator");
const displaymessage_1 = require("../displaymessage");
const authVerification = () => {
    return async (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return (0, displaymessage_1.displaymessage)(constants_1.constants.Code.UNAUTHORIZED, res, ["Access token missing"]);
        }
        (0, TokenGenerator_1.verifyToken)(token).then((payload) => {
            if (payload) {
                req.user = payload;
                next();
            }
            else {
                return (0, displaymessage_1.displaymessage)(constants_1.constants.Code.UNAUTHORIZED, res, ["Invalid access token"]);
            }
        }).catch(() => {
            return (0, displaymessage_1.displaymessage)(constants_1.constants.Code.UNAUTHORIZED, res, ["Invalid access token"]);
        });
    };
};
exports.authVerification = authVerification;
