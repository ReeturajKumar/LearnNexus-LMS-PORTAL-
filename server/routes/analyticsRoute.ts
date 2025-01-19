import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { CourseDataAnalytics, orderDataAnalytics, userDataAnalytics } from "../controllers/analyticsController";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  userDataAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  CourseDataAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  orderDataAnalytics
);

export default analyticsRouter;