/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { styles } from "@/app/styless/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { TbSourceCode } from "react-icons/tb";
import { MdAccessAlarm, MdAccessTime } from "react-icons/md";
import { MdInstallDesktop } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import CourseContentList from "../Course/CourseContentList";

type Props = {
  data: any;
};

const CourseDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const discountPercentage =
    data?.estimatedPrice && data?.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;

  const discountedPrice = Math.round(discountPercentage);

  const isPurchased = user?.course?.some((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    console.log("Order placed");
  };

  console.log(data);
  return (
    <div className="mt-20 min-h-screen">
      <div className="w-[90%] mx-auto py-5">
        {/* Main Container with Left and Right Sections */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Left Side - Course Details */}
          <div className="w-full lg:w-[65%]">
            <h1 className="text-[25px] font-Poppins font-semibold text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <Ratings rating={data.ratings} />
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>

            {/* What You Will Learn */}
            <div className="mt-5">
              <h2 className="text-[22px] font-semibold text-black dark:text-white">
                What You Will Learn From This Course
              </h2>
              <ul className="mt-3 space-y-2">
                {data.benefits?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <IoMdCheckboxOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                    <p className="ml-2 text-black dark:text-white">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h2 className="text-[22px] font-semibold text-black dark:text-white">
                What is The Prerequists
              </h2>
              <ul className="mt-3 space-y-2">
                {data.prereqisites?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center">
                    <IoMdCheckboxOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                    <p className="ml-2 text-black dark:text-white">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>

              <br />
              <br />
              <div>
                <h1 className="text-[25px] font-semibold text-black dark:text-white">
                  Course Overview
                </h1>
                <CourseContentList
                data={data?.courseData}
                isDemo={true}
                />
              </div>
            </div>

            {/* Course Details */}
            <div className="mt-5">
              <h2 className="text-[22px] font-semibold text-black dark:text-white">
                Course Details
              </h2>
              <p className="text-[18px] whitespace-pre-line text-black dark:text-white">
                {data.description}
              </p>
            </div>

            <br />
            <br />
            <div className="w-full">
              <div className="flex items-center gap-2">
                {" "}
                {/* Ensures everything is inline */}
                <Ratings rating={data?.ratings} />
                <h5 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  | Course Rating ({data?.reviews?.length} Reviews)
                </h5>
              </div>
              <br />
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="text-[25px] font-Poppins font-[600] text-white">
                          {item?.user?.name.slice(0, 2)}
                        </h1>
                      </div>
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {" "}
                          {item?.user?.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-black dark:text-white">
                        {item.comment}
                      </p>
                      <small className="text-black dark:text-white">
                        {format(item.createdAt)}
                      </small>
                    </div>
                    <div className="pl-2">
                      <h5 className="text-[18px] text-black dark:text-white">
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Side - Course Player */}
          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-[100px] left-0 w-full">
              <CoursePlayer videoUrl={data.demoUrl} title={data.title} />

              <div className="flex items-center gap-3 pt-5">
                {/* Course Price */}
                <h1 className="text-[25px] font-Poppins font-semibold text-white">
                  {data.price === 0 ? "Free" : `${data.price}$`}
                </h1>

                {/* Original Estimated Price (Strikethrough) */}
                {data.estimatedPrice && data.estimatedPrice > data.price && (
                  <h5 className="text-[20px] mb-5 line-through opacity-60 font-Poppins font-medium text-white">
                    {data.estimatedPrice}$
                  </h5>
                )}

                {/* Discount Percentage */}
                {discountedPrice > 0 && (
                  <h4 className="text-[20px] font-Poppins font-semibold text-white">
                    {discountedPrice}% Off
                  </h4>
                )}
              </div>

              <div>
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Go To Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                <TbSourceCode className="inline-block mr-2" /> Source Code
                Included
              </p>
              <p className="pb-1 text-black dark:text-white">
                <MdAccessTime className="inline-block mr-2" /> Full Lifetime
                Access
              </p>
              <p className="pb-1 text-black dark:text-white">
                <MdInstallDesktop className="inline-block mr-2" /> On Mobile And
                Desktop
              </p>
              <p className="pb-1 text-black dark:text-white">
                <TbCertificate className="inline-block mr-2" /> Certificate Of
                Completion
              </p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">
                <MdSupportAgent className="inline-block mr-2" /> Lifetime
                Technical Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
