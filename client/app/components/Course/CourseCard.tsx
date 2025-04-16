/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile}) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh]  dark:bg-gray-900 dark:border-[#00000047] border-[#fffdfd0f] dark:shadow-2xl rounded-lg p-3 shadow-2xl">
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="w-full rounded"
          alt=""
        />
        <br />
        <h1 className="font-poppins font-bold text-[20px] text-black dark:text-white truncate overflow-hidden whitespace-nowrap">
          {item.name}
        </h1>

        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5
            className={`text-black dark:text-white font-poppins text-[16px] font-semibold ${
              isProfile && "hidden 800px:inline"
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-white font-poppins text-[16px] font-semibold">
              {item.price === 0 ? "Free" : `$${item.price}`}
            </h3>
            <h5 className="pl-3 mt-[-5px] line-through opacity-80 text-black dark:text-white font-poppins text-[14px] font-semibold">
              {item.estimatedPrice} $
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-3 text-black dark:text-white font-poppins text-[16px] font-semibold">
              {item.courseData?.length} Lessons
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
