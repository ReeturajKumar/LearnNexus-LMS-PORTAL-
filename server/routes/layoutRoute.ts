import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { createLayout, editLayout, getLayout } from "../controllers/layoutController";
import { updateAccessToken } from "../controllers/userController";


const layoutRoute = express.Router();


layoutRoute.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout,
);


layoutRoute.put(
  "/edit-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout,
);


layoutRoute.get(
  "/get-layout",
  getLayout,
);


export default layoutRoute;