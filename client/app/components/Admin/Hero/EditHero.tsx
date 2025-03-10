/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import bannerImage from "../../../../public/assets/Banner.png";
import toast from "react-hot-toast";

const EditHero: FC = () => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const { data,refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setImage(data?.layout?.banner?.image?.url || "");
      setTitle(data?.layout?.banner?.title || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-10 lg:py-20 ">
      {/* Left Section: Banner Image */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center">
        <div className="hero_animation absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full z-[-1]"></div>
        <Image
          src={image || bannerImage}
          alt="Hero Banner"
          className="z-10 object-cover w-3/4 sm:w-2/3 md:w-1/2"
          width={700}
          height={700}
        />
        <input
          type="file"
          id="banner"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="banner"
          className="absolute bottom-6 right-6 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          <AiOutlineCamera className="text-gray-700 dark:text-white text-2xl" />
        </label>
      </div>

      {/* Right Section: Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <textarea
          className="w-full bg-transparent text-gray-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight resize-none outline-none border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
          placeholder="Improve Your Online Learning Experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
        />
        <textarea
          className="w-full bg-transparent text-gray-700 dark:text-gray-300 text-base sm:text-lg mt-4 resize-none outline-none border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
          placeholder="We have 40k+ online courses & 500k+ registered students. Find your desired courses from them."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={3}
        />

        {/* Save Button */}
        <button
          className={`mt-6 px-8 py-3 rounded-md font-semibold text-white text-base transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleEdit}
          disabled={
            data?.layout?.banner?.title === title &&
            data?.layout?.banner?.subTitle === subTitle &&
            data?.layout?.banner?.image?.url === image
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditHero;
