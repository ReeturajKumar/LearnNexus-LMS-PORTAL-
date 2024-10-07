import express from "express";
import { editCourse, getAllCourse, getSingleCourse, uploadCourse } from "../controllers/courseController";
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

courseRouter.get(
  "/get-course/:id",
  getSingleCourse,
);


courseRouter.get(
  "/get-courses",
  getAllCourse,
);


export default courseRouter;
