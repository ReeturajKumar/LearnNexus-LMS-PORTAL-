"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middelware/auth");
const notificationController_1 = require("../controllers/notificationController");
const userController_1 = require("../controllers/userController");
const notificationRoute = express_1.default.Router();
notificationRoute.get("/get-all-notifications", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), notificationController_1.getNotifications);
notificationRoute.put("/update-notification/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), notificationController_1.updateNotificationStatus);
exports.default = notificationRoute;
