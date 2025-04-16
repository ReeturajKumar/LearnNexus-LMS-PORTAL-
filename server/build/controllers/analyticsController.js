"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDataAnalytics = exports.CourseDataAnalytics = exports.userDataAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middelware/catchAsyncErrors");
const analyticsGenrator_1 = require("../utils/analyticsGenrator");
const userModel_1 = __importDefault(require("../models/userModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
// user data analytics -- admin
exports.userDataAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const users = await (0, analyticsGenrator_1.generateLast12MonthsData)(userModel_1.default);
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// course data analytics -- admin
exports.CourseDataAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await (0, analyticsGenrator_1.generateLast12MonthsData)(courseModel_1.default);
        res.status(201).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// order data analytics -- admin
exports.orderDataAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const orders = await (0, analyticsGenrator_1.generateLast12MonthsData)(orderModel_1.default);
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
