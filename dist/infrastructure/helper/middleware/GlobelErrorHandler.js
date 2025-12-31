"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobelErrorHandler = exports.ApplicationError = exports.ApplicationErrorType = void 0;
const httpError_1 = require("../httpError");
const displaymessage_1 = require("../displaymessage");
const constants_1 = require("../../config/constants");
const zod_1 = require("zod");
const typeorm_1 = require("typeorm");
var ApplicationErrorType;
(function (ApplicationErrorType) {
    ApplicationErrorType["NOT_FOUND"] = "NOT_FOUND";
    ApplicationErrorType["UNAUTHORIZED"] = "UNAUTHORIZED";
    ApplicationErrorType["FORBIDDEN"] = "FORBIDDEN";
    ApplicationErrorType["CONFLICT"] = "CONFLICT";
    ApplicationErrorType["BAD_REQUEST"] = "BAD_REQUEST";
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
    if (err instanceof httpError_1.HttpError)
        return (0, displaymessage_1.displaymessage)(err.statusCode, res, err.message, err.field);
    if (err instanceof zod_1.ZodError) {
        const messages = err.issues.map((issue) => (issue.message));
        return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.BAD_REQUEST, res, messages);
    }
    if (err instanceof ApplicationError)
        switch (err.title) {
            case "NOT_FOUND": return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.NOT_FOUND, res, err.message);
            case "UNAUTHORIZED": return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.UNAUTHORIZED, res, err.message);
            case "FORBIDDEN": return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.FORBIDDEN, res, err.message);
            case "CONFLICT": return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.CONFLICT, res, err.message);
            case "BAD_REQUEST": return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.BAD_REQUEST, res, err.message);
        }
    if (err instanceof typeorm_1.TypeORMError) {
        console.log("err----------->", err);
        return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
    }
    return (0, displaymessage_1.displaymessage)(constants_1.StatusCodes.INTERNAL_SERVER_ERROR, res, err.message);
};
exports.GlobelErrorHandler = GlobelErrorHandler;
