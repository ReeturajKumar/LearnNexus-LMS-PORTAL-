/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { styles } from "@/app/styless/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdCheckboxOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { TbSourceCode } from "react-icons/tb";
import { MdAccessAlarm, MdAccessTime } from "react-icons/md";
import { MdInstallDesktop } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payments/CheckoutForm";
import { useLoadeUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import avatar from "../../../public/assets/avatar.webp";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute:any
  setOpen:any
};

const CourseDetails = ({ data, stripePromise, clientSecret,setRoute,setOpen:openAuthModel }: Props) => {
  const { data: userData } = useLoadeUserQuery(undefined, {});
  const [user, setUser] = useState<any>()
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUser(userData?.user)

  }, [userData]);
  

  const discountPercentage =
    data?.estimatedPrice && data?.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;

  const discountedPrice = Math.round(discountPercentage);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

const handleOrder = async () => {
  if (!user) {
    setRoute("Login");
    openAuthModel(true);
    return;
  }

  if (isPurchased) return;

  if (data.price === 0) {
    // Mock enrollment for UI only
    toast.success("Enrolled Successfully");
     router.push(`/course-access/${data._id}`);
    return;
  }

  setOpen(true);
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
                <CourseContentList data={data?.courseData} isDemo={true} />
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
                <h5 className="text-2xl font-semibold font-poppins text-black dark:text-white flex items-center gap-2">
                  {data?.ratings?.toFixed(1)}
                  <Ratings rating={data?.ratings} />
                  <span className="text-gray-500 dark:text-gray-400 text-lg">
                    | Course Rating ({data?.reviews?.length} Reviews)
                  </span>
                </h5>
              </div>
              <br />
              <br />
              {data?.reviews &&
                [...data.reviews].reverse().map((item: any, index: number) => (
                  <div
                    className="w-full pb-6"
                    key={index}
                  >
                    <div className="flex items-center gap-4">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer">
                        <Image
                          src={item?.user?.avatar?.url || avatar}
                          alt={item?.user?.name}
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      {/* User Name & Rating */}
                      <div>
                        <h5 className="text-lg font-semibold text-black dark:text-white">
                          {item?.user?.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mt-2 ml-16">
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.comment}
                      </p>
                      <small className="text-gray-500 dark:text-gray-400">
                        {format(item.createdAt)}
                      </small>
                    </div>
                  </div>
                ))}
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

              <div className="flex items-center">
               {isPurchased ? (
  <Link
    className={`${styles.button} !w-[180px] my-3 font-poppins cursor-pointer !bg-[crimson] text-white`}
    href={`/course-access/${data._id}`}
  >
    Go To Course
  </Link>
) : (
  <button
    className={`${styles.button} !w-[220px] my-3 font-poppins cursor-pointer !bg-[crimson]`}
    onClick={handleOrder}
  >
    {data.price === 0 ? "Enroll Now For Free" : `Buy Now ${data.price}$`}
  </button>
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

      <>
        {open && (
          <div className="w-full min-h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoMdCloseCircleOutline
                  size={30}
                  className="cursor-pointer text-black "
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
