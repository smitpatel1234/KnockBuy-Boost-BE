"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displaymessage = void 0;
const displaymessage = (message, res, errors, data) => {
    if (data) {
        return res.status(message.code).json(data);
    }
    if (errors) {
        const messages = errors.map((error) => {
            return error.message;
        });
        return res.status(message.code).json(messages);
    }
    return res.status(message.code).json(message.message);
};
exports.displaymessage = displaymessage;
