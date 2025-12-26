"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDetails = void 0;
const validateDetails = (schema) => {
    return async (req, res, next) => {
        await schema.parse(req.body);
        next();
    };
};
exports.validateDetails = validateDetails;
