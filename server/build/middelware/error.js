"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddelware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddelware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interval server error";
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler_1.default(message, 400);
    }
    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler_1.default(message, 400);
    }
    //JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = "Json web token is expired, try again";
        err = new ErrorHandler_1.default(message, 400);
    }
    res.status(statusCode).json({
        success: false,
        message
    });
};
exports.ErrorMiddelware = ErrorMiddelware;
