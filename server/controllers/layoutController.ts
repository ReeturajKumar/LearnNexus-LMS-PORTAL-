import { NextFunction, Response, Request } from "express";
import ErroHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middelware/catchAsyncErrors";
import LayoutModel from "../models/layoutModel";
import cloudinary from "cloudinary";

// Creating layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // Check if a layout with the given type already exists
      const isTypeExist = await LayoutModel.findOne({ type });

      // 🔴 Prevent duplicate Banner, FAQ, or Categories entries
      if (isTypeExist) {
        return next(new ErroHandler(`${type} already exists`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner", 
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const isFAQExist = await LayoutModel.findOne({ type: "FAQ" });
        if (isFAQExist) {
          return next(new ErroHandler("FAQ layout already exists", 400));
        }

        const { faq } = req.body;
        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }

      if (type === "Categories") {
        const isCategoriesExist = await LayoutModel.findOne({ type: "Categories" });
        if (isCategoriesExist) {
          return next(new ErroHandler("Categories layout already exists", 400));
        }

        const { categories } = req.body;
        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500)); 
    }
  }
);
