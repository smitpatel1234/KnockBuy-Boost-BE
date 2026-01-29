"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobelErrorHandler = exports.ApplicationError = exports.ApplicationErrorType = void 0;
const typeorm_1 = require("typeorm");
const zod_1 = require("zod");
const constants_1 = require("../../config/constants");
const displaymessage_1 = require("../displaymessage");
const httpError_1 = require("../httpError");
var ApplicationErrorType;
(function (ApplicationErrorType) {
    ApplicationErrorType["BAD_REQUEST"] = "BAD_REQUEST";
    ApplicationErrorType["CONFLICT"] = "CONFLICT";
    ApplicationErrorType["FORBIDDEN"] = "FORBIDDEN";
    ApplicationErrorType["NOT_FOUND"] = "NOT_FOUND";
    ApplicationErrorType["UNAUTHORIZED"] = "UNAUTHORIZED";
})(ApplicationErrorType || (exports.ApplicationErrorType = ApplicationErrorType = {}));
class ApplicationError extends Error {
    constructor(title, message) {
        super(message);
        this.title = title;
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
const GlobelErrorHandler = (err, req, res, next) => {
    if (err instanceof httpError_1.HttpError) {
        (0, displaymessage_1.displaymessage)(err.statusCode, res, err.message, err.field);
        return;
    }
    if (err instanceof zod_1.ZodError) {
        const messages = err.issues.map((issue) => (issue.message));
        (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.UNPROCESSABLE_ENTITY, res, messages);
        return;
    }
    if (err instanceof ApplicationError)
        switch (err.title) {
            case ApplicationErrorType.BAD_REQUEST: {
                (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.BAD_REQUEST, res, err.message);
                return;
            }
            case ApplicationErrorType.CONFLICT: {
                (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.CONFLICT, res, err.message);
                return;
            }
            case ApplicationErrorType.FORBIDDEN: {
                (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.FORBIDDEN, res, err.message);
                return;
            }
            case ApplicationErrorType.NOT_FOUND: {
                (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.NOT_FOUND, res, err.message);
                return;
            }
            case ApplicationErrorType.UNAUTHORIZED: {
                (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.UNAUTHORIZED, res, err.message);
                return;
            }
        }
    if (err instanceof typeorm_1.TypeORMError) {
        (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
        return;
    }
    (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
    next();
};
exports.GlobelErrorHandler = GlobelErrorHandler;
