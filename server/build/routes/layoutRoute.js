"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middelware/auth");
const layoutController_1 = require("../controllers/layoutController");
const layoutRoute = express_1.default.Router();
layoutRoute.post("/create-layout", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), layoutController_1.createLayout);
layoutRoute.put("/edit-layout", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), layoutController_1.editLayout);
layoutRoute.get("/get-layout/:type", layoutController_1.getLayout);
exports.default = layoutRoute;
