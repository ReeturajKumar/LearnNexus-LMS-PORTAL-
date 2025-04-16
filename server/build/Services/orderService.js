"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderService = exports.newOrder = void 0;
const catchAsyncErrors_1 = require("../middelware/catchAsyncErrors");
const orderModel_1 = __importDefault(require("../models/orderModel"));
// Create new order
exports.newOrder = (0, catchAsyncErrors_1.CatchAsyncError)(async (data, res, next) => {
    const order = await orderModel_1.default.create(data);
    res.status(201).json({
        success: true,
        order,
    });
});
// get All order
const getAllOrderService = async (res) => {
    const order = await orderModel_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        order,
    });
};
exports.getAllOrderService = getAllOrderService;
