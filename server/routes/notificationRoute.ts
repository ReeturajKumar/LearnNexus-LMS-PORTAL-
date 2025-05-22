import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { getNotifications, updateNotificationStatus } from "../controllers/notificationController";
import { updateAccessToken } from "../controllers/userController";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRoute.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus
);


export default notificationRoute;
