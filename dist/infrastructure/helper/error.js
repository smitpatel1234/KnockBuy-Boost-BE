"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(entity, argument) {
        super(`${entity} not found for this : ${argument}`);
        this.name = "NotFoundError";
        this.entity = entity;
        this.argument = argument;
    }
}
exports.NotFoundError = NotFoundError;
