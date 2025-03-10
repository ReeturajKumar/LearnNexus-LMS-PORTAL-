require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddelware} from './middelware/error';
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoute";
import notificationRouter from "./routes/notificationRoute";
import analyticsRouter from './routes/analyticsRoute'
import layoutRouter from "./routes/layoutRoute";

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",],
      credentials: true
  })
);

//routes
app.use("/api/v1", userRouter); // user authentication
app.use("/api/v1", courseRouter); // admin course creation
app.use("/api/v1", orderRouter); // user order
app.use("/api/v1", notificationRouter); // getting notification for admin
app.use("/api/v1", analyticsRouter); // getting analytics for admin
app.use("/api/v1", layoutRouter); // getting layout

//test route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});


app.use(ErrorMiddelware)
