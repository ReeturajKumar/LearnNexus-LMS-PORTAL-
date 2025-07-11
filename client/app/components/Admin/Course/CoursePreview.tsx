/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/app/styless/style";
import Ratings from "@/app/utils/Ratings";
import { IoMdCheckmark } from "react-icons/io";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,

}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  console.log(courseData);

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}
          </h5>

          <h4 className="pl-4 pt-4 text-[22px]">
            {discountPercentagePrice} % off
          </h4>
        </div>

        <div className="flex items-center">
  {courseData?.price === 0 ? (
    <div
      className={`${styles.button} !w-[180px] my-3 font-poppins !bg-green-600 cursor-pointer`}
      onClick={() => {
        // Replace this with your actual free enrollment logic
        console.log("Enroll in free course:", courseData?._id);
        // handleFreeEnroll(courseData?._id);
      }}
    >
      Go to Course
    </div>
  ) : (
    <div
      className={`${styles.button} !w-[180px] my-3 font-poppins !bg-[crimson] cursor-pointer`}
      onClick={() => {
        // Replace this with your paid checkout logic
        console.log("Proceed to checkout:", courseData?._id);
        // handlePaidCheckout(courseData?._id);
      }}
    >
      Buy Now {courseData?.price}$
    </div>
  )}
</div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount Code"
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-poppins  cursor-not-allowed`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">Source Code Included</p>
        <p className="pb-1">Full lifetime access</p>
        <p className="pb-1">Access on mobile and desktop</p>
        <p className="pb-1">Certificate of Completion</p>
        <p className="pb-3 md:pb-1">Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <h1 className="text-[25px] font-poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex justify-between items-center pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-poppins font-[600]">
            What you will learn from this course
          </h1>
        </div>
        {courseData?.benefits?.map((benefit: any, index: number) => (
          <div className="flex items-center mt-3" key={index}>
            <div className="mr-2">
              <IoMdCheckmark className="text-[25px]" />
            </div>
            <h5>{benefit.title}</h5>
          </div>
        ))}
        <br />
        <br />
        <br />
        <h1 className="text-[25px] font-poppins font-[600]">
          What are the Prerequisites for Starting this course ?
        </h1>
        {courseData?.prereqisites?.map((item: any, index: number) => (
          <div className="flex items-center mt-3" key={index}>
            <div className="mr-2">
              <IoMdCheckmark className="text-[25px]" />
            </div>
            <h5>{item.title}</h5>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-poppins font-[600]">Description</h1>
          <p className="pt-3 text-[18px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => prevButton()}
        >
          Previous
        </div>
        <div
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer flex items-center justify-center"
          onClick={() => createCourse()}
        >
          {
            isEdit
              ? "Update Course"
              : "Create Course"
          }
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
