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
      const isTypeExist = await LayoutModel.findOne({ type });
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
         banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        },
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
        const isCategoriesExist = await LayoutModel.findOne({
          type: "Categories",
        });
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

// Edit layout
// Edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // ✅ Fixed Banner Section
      if (type === "Banner") {
        const bannerData = await LayoutModel.findOne({ type: "Banner" });

        if (!bannerData) {
          return next(new ErroHandler("Banner data not found", 404));
        }

        const { image, title, subTitle } = req.body;

        let uploadedImage = bannerData.banner.image;

        if (!image.startsWith("https")) {
          // Upload only if it's a new image
          const data = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

          uploadedImage = {
            public_id: data.public_id,
            url: data.secure_url,
          };
        }

        // ✅ Updated banner object
        const updatedBanner = {
          type: "Banner",
          image: uploadedImage,
          title,
          subTitle,
        };

        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner: updatedBanner });

        return res.status(200).json({
          success: true,
          message: "Banner updated successfully",
        });
      }

      // ✅ Fixed FAQ Section
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await LayoutModel.findOne({ type: "FAQ" });

        if (!faqData) {
          return next(new ErroHandler("FAQ data not found", 404));
        }

        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        await LayoutModel.findByIdAndUpdate(faqData._id, {
          type: "FAQ",
          faq: faqItems,
        });

        return res.status(200).json({
          success: true,
          message: "FAQ updated successfully",
        });
      }

      // ✅ Fixed Categories Section
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await LayoutModel.findOne({ type: "Categories" });

        if (!categoriesData) {
          return next(new ErroHandler("Categories data not found", 404));
        }

        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        await LayoutModel.findByIdAndUpdate(categoriesData._id, {
          type: "Categories",
          categories: categoriesItems,
        });

        return res.status(200).json({
          success: true,
          message: "Categories updated successfully",
        });
      }

      return next(new ErroHandler("Invalid type provided", 400));
      
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);


// get layout by type
export const getLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const layout = await LayoutModel.findOne({ type });
      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErroHandler(error.message, 500));
    }
  }
);
