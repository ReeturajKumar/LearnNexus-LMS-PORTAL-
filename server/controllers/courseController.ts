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
import userModel from "../models/userModel";
import axios from 'axios';

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
      const courseId = req.params.id;
      const courseData = await CourseModel.findById(courseId) as any;

      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail?.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }


      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }
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

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);

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

// get all courses -- without purchasing
export const getAllCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        res.status(200).json({
          success: true,
          courses,
        });
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

      console.log("User's courses: ", userCourseList); // Debugging log
      console.log("Requested Course ID: ", courseId); // Debugging log

      // Ensure we're comparing ObjectId to ObjectId or string to string
      const courseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId
      );

      console.log("Does course exist in user's list? ", courseExist); // Debugging log

      if (!courseExist) {
        return next(
          new ErroHandler("You are not eligible to access this course", 404)
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

      // Validate courseData
      if (!Array.isArray(course.courseData) || course.courseData.length === 0) {
        return next(new ErroHandler("No course data found", 404));
      }

      // Find the specific course content
      const courseContent = course.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErroHandler("Content not found in the course", 404));
      }

      // Validate questions array
      if (!Array.isArray(courseContent.questions)) {
        return next(new ErroHandler("Questions array is invalid", 400));
      }

      // Creating a new question
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

      // Create a notification for the user
      await NotificationModel.create({
        user: req.user._id,
        title: "New Question Received",
        message: `You have a new question in ${courseContent.title}`,
      });

      // Save the updated course
      await course.save();

      // Return a successful response
      res.status(200).json({
        success: true,
        message: "Question added successfully",
        question: newQuestion,
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

      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        console.log("Invalid courseId:", courseId);
        return next(new ErroHandler("Invalid course ID", 400));
      }

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

      if (!question) {
        return next(new ErroHandler("Invalid Question", 404));
      }

      // Add the answer to the question
      const newAnswer: any = { user: req.user, answer };
      question.questionReplies.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id.toString()) {
        // Create notification for the user who asked the question
        await NotificationModel.create({
          user: req.user?._id,
          title: "New Answer to Your Question",
          message: `You have a new answer to your question in ${courseContent.title}`,
        });
      } else {
        const questionUser = await userModel
          .findById(question.user)
          .select("email name");

        if (!questionUser || !questionUser.email) {
          return next(
            new ErroHandler("Failed to send email: User email not found", 500)
          );
        }

        const data = {
          name: questionUser.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/answer-mail.ejs"),
          data
        );

        try {
          await sendMail({
            email: questionUser.email,
            subject: "New Answer to Your Question",
            template: "answer-mail.ejs",
            data: { ...data, html },
          });
        } catch (error: any) {
          return next(new ErroHandler(error.message, 500));
        }
      }
      res.status(200).json({
        success: true,
        message: "Answer added successfully and user notified if applicable",
        course,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
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
        user: {
          _id: req.user?._id,
          name: req.user?.name,
          email: req.user?.email,
        },
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

      // ✅ Create notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Review Received",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      });

      res.status(201).json({
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
export const getAdminAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCourseService(res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// deleting course -- admin
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);
      if (!course) {
        return next(new ErroHandler("Course not found", 404));
      }

      await course.deleteOne({ id });
      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);


// genrate video url
export const genrateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`, 
        { ttl: 300 }, 
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Apisecret ${process.env.VDOCIPHER_API_SECRET}`
          }
        }
      );

     res.json(response.data);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);
