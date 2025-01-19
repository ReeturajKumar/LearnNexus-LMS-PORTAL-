import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import NotificationModel from "../models/notificationModel";
import { NextFunction, Request, Response } from "express";
import ErroHandler from "../utils/ErrorHandler";
import cron from "node-cron";

// get all notifications
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);

// upading notification status -- admin
export const updateNotificationStatus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);

      if (!notification) {
        return next(new ErroHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification.status;
      }

      await notification.save();
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);


//delete notifications -- admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({ status: "read", createdAt: { $lt: thirtyDaysAgo } });
})
