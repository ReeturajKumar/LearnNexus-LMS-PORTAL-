import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import ErroHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../Services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import { userInfo } from "os";
import { title } from "process";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMails";

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
      const {question, courseId, contentId} : IAddQuestionData = req.body;

      const course = await CourseModel.findById(courseId);

      if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next (new ErroHandler("Invalid content id", 400))
      }

      const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

      if(!courseContent){
        return next (new ErroHandler("Invalid content id", 400))
      }

      //creating new question
      const newQuestion:any = {
        user: req.user,
        question,
      }

      //add this question to our course content
      courseContent.questions.push(newQuestion);

      //save our course
      await course?.save();
      res.status(201).json({  
        success: true,
        course,
      })
    } catch (error:any) {
      return next (new ErroHandler(error.message, 500))
    }
})


//adding answer of question in course
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}


export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {answer, courseId, contentId, questionId} : IAddAnswerData = req.body;

      const course = await CourseModel.findById(courseId);

      if(!mongoose.Types.ObjectId.isValid(contentId)){
        return next (new ErroHandler("Invalid content id", 400))
      }

      const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

      if(!courseContent){
        return next (new ErroHandler("Invalid content id", 400))
      }

      const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

      if(!question){
        return next (new ErroHandler("Invalid question id", 400))
      }


      // creating answer object data 
      const newAnswer:any = {
        user: req.user,
        answer
      }

      //add answer to our course content
      question.questionReplies.push(newAnswer);
      //save our course
      await course?.save();

      if(req.user?._id === question.user._id){
        // create a notification  
      } else{
        const data = {
          name: question.user.name,
          title: courseContent.title
        }

        //create notification
        const html = await ejs.renderFile(
          path.join(__dirname, '../mails/answer-mail.ejs'),
          data);

          try {
            await sendMail({
              email: question.user.email,
              subject: "New Reply Notification",
              template: "answer-mail",
              data,
            })
          } catch (error:any) {
            return next (new ErroHandler(error.message, 500))
          }
      }

      res.status(200).json({
        success: true,
        course,
      })
    } catch (error:any) {
      return next (new ErroHandler(error.message, 500))
    }
})