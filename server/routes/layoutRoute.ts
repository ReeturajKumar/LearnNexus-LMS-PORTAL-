import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { createLayout, editLayout, getLayout } from "../controllers/layoutController";
import { updateAccessToken } from "../controllers/userController";


const layoutRoute = express.Router();


layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout,
);


layoutRoute.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout,
);


layoutRoute.get(
  "/get-layout/:type",
  getLayout,
);


export default layoutRoute;