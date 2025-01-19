import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { createLayout } from "../controllers/layoutController";


const layoutRoute = express.Router();


layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout,
);


export default layoutRoute;