import express from "express";
import { editCourse, uploadCourse } from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse,
);
export default courseRouter;
