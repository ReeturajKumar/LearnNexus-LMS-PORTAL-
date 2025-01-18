import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import ErroHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCourseService } from "../Services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs, { name } from "ejs";
import path from "path";
import sendMail from "../utils/sendMails";
import NotificationModel from "../models/notificationModel";

// create course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail?.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// get single course
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCatchExist = await redis.get(courseId);

      if (isCatchExist) {
        const course = JSON.parse(isCatchExist);
        return res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set(courseId, JSON.stringify(course));

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// get all courses
export const getAllCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCatchExist = await redis.get("allcourses");

      if (isCatchExist) {
        const courses = JSON.parse(isCatchExist);
        return res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

//get course content --- only authenticated user can access
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErroHandler("You are not eligble to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

//add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;

      // Validate courseId and contentId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErroHandler("Invalid course ID", 400));
      }
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErroHandler("Invalid content ID", 400));
      }

      // Check if user is authenticated
      if (!req.user) {
        return next(new ErroHandler("User not authenticated", 401));
      }

      // Find the course
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErroHandler("Course not found", 404));
      }

      // Find the specific course content
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErroHandler("Content not found in the course", 404));
      }

      // Creating a new question with user details
      const newQuestion: any = {
        user: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
        question,
      };

      // Add the question to course content
      courseContent.questions.push(newQuestion);

      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question Received",
        message: `You have a new question in ${courseContent.title}`,
      });

      // Save the updated course
      await course.save();

      res.status(201).json({
        success: true,
        message: "Question added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message || "Server error", 500));
    }
  }
);

//adding answer of question in course
interface IAddAnswerData {
  questionId: string;
  answer: string;
  courseId: string;
  contentId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, questionId, courseId, contentId }: IAddAnswerData =
        req.body;

      // Check if the user is authenticated
      if (!req.user) {
        return next(new ErroHandler("User not authenticated", 401));
      }

      // Validate courseId and contentId
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErroHandler("Invalid course ID", 400));
      }

      // Find the course
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErroHandler("Course not found", 404));
      }

      // Find the specific course content
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErroHandler("Content not found in the course", 404));
      }

      // Find the question inside the course content
      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question || !question.user) {
        return next(
          new ErroHandler("Question not found or user details missing", 404)
        );
      }

      // Add the answer to the question
      const newAnswer: any = { user: req.user._id, answer };
      question.questionReplies.push(newAnswer);

      await course.save();

      // Notify the user who added the question, if they're not the one answering
      if (req.user._id.toString() !== question.user._id.toString()) {
        await NotificationModel.create({
          user: req.user?._id,
          title: "New Answer to Your Question",
          message: `You have a new answer to your question in ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/answer-mail.ejs"),
          data
        );

        // Send email notification to the user who asked the question
        try {
          await sendMail({
            email: question.user.email,
            subject: "New Answer to Your Question",
            template: "answer-mail.ejs",
            data: { ...data, html },
          });
        } catch (emailError: any) {
          console.error(
            "Error sending email notification:",
            emailError.message
          );
        }
      }

      // Response back with success
      res.status(200).json({
        success: true,
        message: "Answer added successfully and user notified if applicable",
        course,
      });
    } catch (error: any) {
      console.error("Error in addAnswer:", error);
      return next(new ErroHandler(error.message || "Server error", 500));
    }
  }
);

// adding review in course

interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExist) {
        return next(
          new ErroHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);
      const { review, rating }: IAddReviewData = req.body;

      const reviewData: any = {
        user: req.user,
        rating,
        comment: review,
      };

      course?.reviews.push(reviewData);

      let avg = 0;
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course?.reviews.length;
      }

      await course?.save();

      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      };

      // create notification here : ->

      res.status(200).json({
        success: true,
        message: "Review added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

//add reply in reviews
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErroHandler("Course not found", 404));
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );

      if (!review) {
        return next(new ErroHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course.save();

      res.status(200).json({
        success: true,
        message: "Reply added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);


// get all course -- admin
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCourseService(res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
)