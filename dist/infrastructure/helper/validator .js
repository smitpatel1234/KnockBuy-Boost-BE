"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDetails = void 0;
const constants_1 = require("../config/constants");
const displaymessage_1 = require("./displaymessage");
const validateDetails = (schema) => {
    return async (req, res, next) => {
        const result = await schema.safeParse(req.body);
        if (!result.success) {
            return (0, displaymessage_1.displaymessage)(constants_1.constants.Code.BAD_REQUEST, res, result.error.issues);
        }
        next();
    };
};
exports.validateDetails = validateDetails;
