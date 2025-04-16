"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genrateVideoUrl = exports.deleteCourse = exports.getAdminAllCourses = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getAllCourse = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const catchAsyncErrors_1 = require("../middelware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const courseService_1 = require("../Services/courseService");
const courseModel_1 = __importDefault(require("../models/courseModel"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMails_1 = __importDefault(require("../utils/sendMails"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const axios_1 = __importDefault(require("axios"));
// create course
exports.uploadCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, courseService_1.createCourse)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// edit course
exports.editCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        const courseData = (yield courseModel_1.default.findById(courseId));
        if (!courseData) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        if (thumbnail && !thumbnail.startsWith("https")) {
            yield cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        if (thumbnail.startsWith("https")) {
            data.thumbnail = {
                public_id: courseData === null || courseData === void 0 ? void 0 : courseData.thumbnail.public_id,
                url: courseData === null || courseData === void 0 ? void 0 : courseData.thumbnail.url,
            };
        }
        const course = yield courseModel_1.default.findByIdAndUpdate(courseId, { $set: data }, { new: true });
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// get single course
exports.getSingleCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const isCatchExist = yield redis_1.redis.get(courseId);
        if (isCatchExist) {
            const course = JSON.parse(isCatchExist);
            return res.status(200).json({
                success: true,
                course,
            });
        }
        else {
            const course = yield courseModel_1.default.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// get all courses -- without purchasing
exports.getAllCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseModel_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
//get course content --- only authenticated user can access
exports.getCourseByUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        // Ensure we're comparing ObjectId to ObjectId or string to string
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((course) => course._id.toString() === courseId);
        if (!courseExist) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = yield courseModel_1.default.findById(courseId);
        const content = course === null || course === void 0 ? void 0 : course.courseData;
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addQuestion = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, courseId, contentId } = req.body;
        // Validate courseId and contentId
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return next(new ErrorHandler_1.default("Invalid course ID", 400));
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content ID", 400));
        }
        // Check if user is authenticated
        if (!req.user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        // Find the course
        const course = yield courseModel_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        // Validate courseData
        if (!Array.isArray(course.courseData) || course.courseData.length === 0) {
            return next(new ErrorHandler_1.default("No course data found", 404));
        }
        // Find the specific course content
        const courseContent = course.courseData.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content not found in the course", 404));
        }
        // Validate questions array
        if (!Array.isArray(courseContent.questions)) {
            return next(new ErrorHandler_1.default("Questions array is invalid", 400));
        }
        // Creating a new question
        const newQuestion = {
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar.url,
            },
            question,
        };
        // Add the question to course content
        courseContent.questions.push(newQuestion);
        // Create a notification for the user
        yield notificationModel_1.default.create({
            user: req.user._id,
            title: "New Question Received",
            message: `You have a new question in ${courseContent.title}`,
        });
        // Save the updated course
        yield course.save();
        // Return a successful response
        res.status(200).json({
            success: true,
            message: "Question added successfully",
            question: newQuestion,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message || "Server error", 500));
    }
}));
exports.addAnswer = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { answer, questionId, courseId, contentId } = req.body;
        const course = yield courseModel_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return next(new ErrorHandler_1.default("Invalid course ID", 400));
        }
        const courseContent = (_a = course === null || course === void 0 ? void 0 : course.courseData) === null || _a === void 0 ? void 0 : _a.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content not found in the course", 404));
        }
        // Find the question inside the course content
        const question = (_b = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions) === null || _b === void 0 ? void 0 : _b.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid Question", 404));
        }
        // Add the answer to the question
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        question.questionReplies.push(newAnswer);
        yield (course === null || course === void 0 ? void 0 : course.save());
        if (((_c = req.user) === null || _c === void 0 ? void 0 : _c._id) === question.user._id.toString()) {
            // Create notification for the user who asked the question
            yield notificationModel_1.default.create({
                user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id,
                title: "New Answer to Your Question",
                message: `You have a new answer to your question in ${courseContent.title}`,
            });
        }
        else {
            const questionUser = yield userModel_1.default
                .findById(question.user)
                .select("email name");
            if (!questionUser || !questionUser.email) {
                return next(new ErrorHandler_1.default("Failed to send email: User email not found", 500));
            }
            const data = {
                name: questionUser.name,
                title: courseContent.title,
                avatar: questionUser.avatar.url,
            };
            const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/answer-mail.ejs"), data);
            try {
                yield (0, sendMails_1.default)({
                    email: questionUser.email,
                    subject: "New Answer to Your Question",
                    template: "answer-mail.ejs",
                    data: Object.assign(Object.assign({}, data), { html }),
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            message: "Answer added successfully and user notified if applicable",
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addReview = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userCourseList = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        const courseExist = userCourseList === null || userCourseList === void 0 ? void 0 : userCourseList.some((course) => course._id.toString() === courseId.toString());
        if (!courseExist) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course", 404));
        }
        const course = yield courseModel_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            rating,
            comment: review,
        };
        course === null || course === void 0 ? void 0 : course.reviews.push(reviewData);
        let avg = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        if (course) {
            course.ratings = avg / (course === null || course === void 0 ? void 0 : course.reviews.length);
        }
        yield (course === null || course === void 0 ? void 0 : course.save());
        yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        // ✅ Create notification
        yield notificationModel_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            title: "New Review Received",
            message: `${(_c = req.user) === null || _c === void 0 ? void 0 : _c.name} has given a review in ${course === null || course === void 0 ? void 0 : course.name}`,
        });
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
exports.addReplyToReview = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = yield courseModel_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = (_a = course === null || course === void 0 ? void 0 : course.reviews) === null || _a === void 0 ? void 0 : _a.find((rev) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
            user: req.user,
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        (_b = review.commentReplies) === null || _b === void 0 ? void 0 : _b.push(replyData);
        yield course.save();
        yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        res.status(200).json({
            success: true,
            message: "Reply added successfully",
            course,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// get all course -- admin
exports.getAdminAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, courseService_1.getAllCourseService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// deleting course -- admin
exports.deleteCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield courseModel_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        yield course.deleteOne({ id });
        yield redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// genrate video url
exports.genrateVideoUrl = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.body;
        const response = yield axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
