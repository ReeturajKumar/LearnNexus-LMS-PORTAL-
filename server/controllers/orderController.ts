import { NextFunction } from "express";
import { Request, Response } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import ErroHandler from "./../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/orderModel";
import userModel from "../models/userModel";
import CourseModel, { ICourse } from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMails";
import NotificationModel from "../models/notificationModel";
import { getAllOrderService, newOrder } from "../Services/orderService";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      if(payment_info){
        if("id" in payment_info){
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

          if (paymentIntent.status !== "succeeded") {
            return next(new ErroHandler("Payment failed", 400));
          }
        }
      }
      const user = await userModel.findById(req.user?._id);
      const courseExistIUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistIUser) {
        return next(new ErroHandler("You already purchased this course", 400));
      }

      const course: any = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErroHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          Date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-mail.ejs"),
        {
          order: mailData,
        }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-mail.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErroHandler(error.message, 500));
      }

      user?.courses.push(course?._id);

      await redis.set(req.user?._id as string, JSON.stringify(user));
      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `${user?.name} have successfully purchased ${course?.name}`,
      });

      course.purchased =  course.purchased +1;

      await course.save();
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// get all course  order -- admin
export const getAllOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrderService(res);
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// stripe integration
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// stripe new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "LearnNexus",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);
