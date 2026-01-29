"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successmessage = exports.displaymessage = void 0;
const constants_1 = require("../config/constants");
const displaymessage = (StatusCodes, res, message, data) => {
    res.status(StatusCodes).json({ data, message });
};
exports.displaymessage = displaymessage;
const successmessage = (res, message, data) => {
    if (message) {
        (0, exports.displaymessage)(constants_1.StatusCodes.OK, res, message, data);
        return;
    }
    (0, exports.displaymessage)(constants_1.StatusCodes.OK, res, "Request is successful", data);
};
exports.successmessage = successmessage;
