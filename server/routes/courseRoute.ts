import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, genrateVideoUrl, getAdminAllCourses, getAllCourse, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { updateAccessToken } from "../controllers/userController";
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


courseRouter.get("/get-course",isAuthenticated, getAllCourse);


courseRouter.get(
  "/get-admin-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);


courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByUser
);


courseRouter.put(
  "/add-question",
  isAuthenticated,
  addQuestion,
);

courseRouter.put(
  "/add-answer",
  isAuthenticated,
  addAnswer
);

courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addReview,
);


courseRouter.put(
  "/add-reply",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview,
);


courseRouter.post(
  "/getVdoCipherOTP",
  genrateVideoUrl
);

courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
