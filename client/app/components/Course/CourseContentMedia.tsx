/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { styles } from "@/app/styless/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { format } from "timeago.js";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
  id,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [
    addNewQuestion,
    { isLoading: questionCreationLoading, isSuccess, error },
  ] = useAddNewQuestionMutation({});
  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question Added Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess, refetch]);

  const handleAnswerSubmit = () => {
    console.log("Answer");
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      {/* Video Player */}
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between my-4">
        <button
          className={`${styles.button} !w-auto !min-h-[40px] !py-2 ${
            activeVideo === 0 && "!cursor-not-allowed opacity-50"
          }`}
          onClick={() => setActiveVideo(Math.max(activeVideo - 1, 0))}
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft className="mr-2" /> Previous Lesson
        </button>

        <button
          className={`${styles.button} !w-auto !min-h-[40px] !py-2 ${
            data.length - 1 === activeVideo && "!cursor-not-allowed opacity-50"
          }`}
          onClick={() =>
            setActiveVideo(
              activeVideo < data.length - 1 ? activeVideo + 1 : activeVideo
            )
          }
          disabled={data.length - 1 === activeVideo}
        >
          Next Lesson <AiOutlineArrowRight className="ml-2" />
        </button>
      </div>

      {/* Course Title */}
      <h1 className="text-[25px] font-Poppins font-semibold text-black dark:text-white pt-5">
        {data[activeVideo]?.title}
      </h1>

      {/* Tabs */}
      <div className="w-full p-4 flex items-center justify-between bg-slate-700 rounded-md shadow-md dark:bg-opacity-20">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <h5
            key={index}
            className={`cursor-pointer text-lg font-medium transition-colors duration-300 ${
              activeBar === index
                ? "text-red-500"
                : "text-white hover:text-gray-300"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h5>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeBar === 0 && (
          <p className="dark:text-white text-black text-[18px] whitespace-pre-line mb-3">
            {data[activeVideo]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links?.map((item: any, index: number) => (
              <div key={index} className="mb-5 flex items-center">
                <h2 className="text-lg font-semibold dark:text-white text-black">
                  {item.title && `${item.title} :`}
                </h2>
                <Link
                  className="inline-block text-[#62a0c4] dark:text-[#4395c4] text-lg pl-2 hover:underline"
                  href={item.url}
                >
                  {item.url}
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
                alt="Avatar"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={400}
                rows={5}
                placeholder="Write a question about this course, your doubt..."
                className="w-full p-3 rounded-lg outline-none bg-transparent ml-3 border border-[#06040457] dark:border-[#333] 800px:w-full rounded-w[90%] 800px:text-black 800px:dark:text-white 8000pxtext-[18px] font-poppins text-black dark:text-white"
              />
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                  questionCreationLoading && "cursor-not-allowed"
                }`}
                onClick={
                  questionCreationLoading ? () => {} : handleQuestionSubmit
                }
              >
                Submit
              </div>
            </div>
            <br />
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setAnswerId={setAnswerId}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full flex flex-col">
            {!isReviewExists && (
              <div className="flex flex-col space-y-4">
                {/* User Avatar */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    alt="Avatar"
                  />
                  <h5 className="text-[18px] font-semibold text-black dark:text-white">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                </div>

                {/* Star Rating Section */}
                <div className="flex pl-4">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>

                {/* Comment Box */}
                <textarea
                  name="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  cols={40}
                  rows={5}
                  placeholder="Write your comment..."
                  className="w-full p-3 rounded-lg outline-none bg-transparent ml-3 border border-[#06040457] dark:border-[#333] 800px:w-full rounded-w[90%] 800px:text-black 800px:dark:text-white 8000pxtext-[18px] font-poppins text-black dark:text-white"
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-lg transition-all duration-200">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            item={item}
            activeVideo={activeVideo}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  item,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  console.log(item);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px]">
          {item?.user?.avatar ? (
        <Image
          src={item?.user?.avatar}
          alt={item?.user?.name}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
      ) : (
        <div className="w-[50px] h-[50px] bg-slate-600 rounded-full flex items-center justify-center cursor-pointer">
          <h1 className="uppercase font-semibold text-[18px] text-black dark:text-white">
            {item?.user?.name?.charAt(0,2)}
          </h1>
        </div>
      )}
          </div>
          <div className="pl-3">
            <h5 className="text-[18px] font-semibold text-black dark:text-white">
              {item?.user.name} {/* Updated here */}
            </h5>
            <p>{item?.question}</p>
            <small>
              {format(item.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContentMedia;
