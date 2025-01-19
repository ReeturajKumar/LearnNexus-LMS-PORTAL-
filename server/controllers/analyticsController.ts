import { Request, Response, NextFunction } from "express";
import ErroHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analyticsGenrator";
import userModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

// user data analytics -- admin
export const userDataAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);


// course data analytics -- admin
export const CourseDataAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsData(CourseModel);

      res.status(201).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);

// order data analytics -- admin
export const orderDataAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(OrderModel);  

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 400));
    }
  }
);
