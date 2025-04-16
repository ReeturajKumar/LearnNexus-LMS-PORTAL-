"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErroHandler extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.stausCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErroHandler;
