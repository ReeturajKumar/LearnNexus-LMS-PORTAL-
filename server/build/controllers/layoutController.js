"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayout = exports.editLayout = exports.createLayout = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middelware/catchAsyncErrors");
const layoutModel_1 = __importDefault(require("../models/layoutModel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
// Creating layout
exports.createLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layoutModel_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exists`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
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
            await layoutModel_1.default.create(banner);
        }
        if (type === "FAQ") {
            const isFAQExist = await layoutModel_1.default.findOne({ type: "FAQ" });
            if (isFAQExist) {
                return next(new ErrorHandler_1.default("FAQ layout already exists", 400));
            }
            const { faq } = req.body;
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            await layoutModel_1.default.create({ type: "FAQ", faq: faqItems });
        }
        if (type === "Categories") {
            const isCategoriesExist = await layoutModel_1.default.findOne({
                type: "Categories",
            });
            if (isCategoriesExist) {
                return next(new ErrorHandler_1.default("Categories layout already exists", 400));
            }
            const { categories } = req.body;
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            await layoutModel_1.default.create({
                type: "Categories",
                categories: categoriesItems,
            });
        }
        res.status(201).json({
            success: true,
            message: "Layout created successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Edit layout
// Edit layout
exports.editLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        // ✅ Fixed Banner Section
        if (type === "Banner") {
            const bannerData = await layoutModel_1.default.findOne({ type: "Banner" });
            if (!bannerData) {
                return next(new ErrorHandler_1.default("Banner data not found", 404));
            }
            const { image, title, subTitle } = req.body;
            let uploadedImage = bannerData.banner.image;
            if (!image.startsWith("https")) {
                // Upload only if it's a new image
                const data = await cloudinary_1.default.v2.uploader.upload(image, {
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
            await layoutModel_1.default.findByIdAndUpdate(bannerData._id, { banner: updatedBanner });
            return res.status(200).json({
                success: true,
                message: "Banner updated successfully",
            });
        }
        // ✅ Fixed FAQ Section
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqData = await layoutModel_1.default.findOne({ type: "FAQ" });
            if (!faqData) {
                return next(new ErrorHandler_1.default("FAQ data not found", 404));
            }
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            await layoutModel_1.default.findByIdAndUpdate(faqData._id, {
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
            const categoriesData = await layoutModel_1.default.findOne({ type: "Categories" });
            if (!categoriesData) {
                return next(new ErrorHandler_1.default("Categories data not found", 404));
            }
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            await layoutModel_1.default.findByIdAndUpdate(categoriesData._id, {
                type: "Categories",
                categories: categoriesItems,
            });
            return res.status(200).json({
                success: true,
                message: "Categories updated successfully",
            });
        }
        return next(new ErrorHandler_1.default("Invalid type provided", 400));
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get layout by type
exports.getLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layoutModel_1.default.findOne({ type });
        res.status(201).json({
            success: true,
            layout,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
