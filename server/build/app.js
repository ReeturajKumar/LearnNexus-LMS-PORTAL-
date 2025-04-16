"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middelware/error");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const courseRoute_1 = __importDefault(require("./routes/courseRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
const analyticsRoute_1 = __importDefault(require("./routes/analyticsRoute"));
const layoutRoute_1 = __importDefault(require("./routes/layoutRoute"));
const express_rate_limit_1 = require("express-rate-limit");
//body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
//cookie parser
exports.app.use((0, cookie_parser_1.default)());
//cors
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
    ],
    credentials: true
}));
//api request limit
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
//routes
exports.app.use("/api/v1", userRoute_1.default); // user authentication
exports.app.use("/api/v1", courseRoute_1.default); // admin course creation
exports.app.use("/api/v1", orderRoute_1.default); // user order
exports.app.use("/api/v1", notificationRoute_1.default); // getting notification for admin
exports.app.use("/api/v1", analyticsRoute_1.default); // getting analytics for admin
exports.app.use("/api/v1", layoutRoute_1.default); // getting layout
//test route
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});
//unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// middleware callls
exports.app.use(limiter);
exports.app.use(error_1.ErrorMiddelware);
