"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const constants_1 = require("../config/constants");
const globalTypes_1 = require("../../domain/globalTypes/globalTypes");
const statusCodeToErrorTypesDict = {
    404: 'NOT_FOUND',
    409: 'CONFLICT',
    500: 'NO_DATA_FOUND'
};
class HttpError extends Error {
    constructor(error) {
        super(error.description);
        this.message = 'INTERNAL_SERVER_ERROR';
        this.statusCode = constants_1.StatusCodes.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = error.message.tag;
        this.field = error.message.field ? error.message.field : {};
        this.statusCode = error.statusCode;
        this.type =
            error.type ??
                statusCodeToErrorTypesDict[error.statusCode] ??
                globalTypes_1.ErrorTypes.NO_DATA_FOUND;
        Error.captureStackTrace(this);
    }
}
exports.HttpError = HttpError;
