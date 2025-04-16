/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"
import Image from 'next/image';
import React, { FC, useState } from 'react';
import bannerImage from '../../public/assets/Banner.png';
import H1 from '../../public/assets/H1.jpg';
import H2 from '../../public/assets/H2.jpg';
import H3 from '../../public/assets/H3.jpg';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from './Loader/Loader';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {};

const Hero: FC<Props> = (props) => {

    const { data,isLoading} = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState("");
    const router = useRouter()


    const handleSearch  = () => {
      if (search === "") {
        return;
      } else {
        router.push(`/courses?title=${search}`);
      }
    };


  return (
    <>
    {
      isLoading ? (
        <Loader/>
      ) : (
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between relative overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 lg:gap-16 xl:gap-20">
        {/* Left Section: Banner Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative pt-20 sm:pt-24 lg:pt-0">
          {/* Hero animation background */}
          <div className="hero_animation absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full z-[-1]"></div>
          <Image
            src={data?.layout?.banner?.image?.url || bannerImage}
            width={700}
            height={700}
            alt="Hero"
            className="z-10 object-contain max-w-full h-auto w-[80%] sm:w-[70%] md:w-[60%] lg:w-auto"
          />
        </div>
  
        {/* Right Section: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[48px] xl:text-[60px] font-semibold leading-tight sm:leading-[40px] md:leading-[50px] lg:leading-[60px] xl:leading-[70px]">
            <span className="text-black dark:text-white">
             {data?.layout?.banner?.title}
            </span>{""}
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Better Instantly</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 sm:mt-4 max-w-md sm:max-w-lg">
            <span className="text-gray-700 dark:text-gray-300">
             {data?.layout?.banner?.subTitle}
            </span>
          </p>
  
          {/* Search Input */}
          <div className="mt-5 sm:mt-6 flex w-full max-w-xs sm:max-w-sm md:max-w-md">
            <input
              type="text"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-md outline-none text-black dark:text-white bg-gray-100 dark:bg-gray-800"
            />
            <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-r-md text-sm sm:text-base"
            onClick={handleSearch}
            >
              Search
            </button>
          </div>
  
          {/* User Stats */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                src={H1}
                alt="User 1"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white"
              />
              <Image
                src={H2}
                alt="User 2"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white"
              />
              <Image
                src={H3}
                alt="User 3"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white"
              />
            </div>
            <p className="text-xs sm:text-sm">
              <span className="text-black dark:text-white font-medium">
                500k+
              </span>{' '}
              <span className="text-gray-700 dark:text-gray-300">
                People already trust us.{' '}
              </span>
              <Link href={"/courses"} className="text-green-500 underline">
              View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
      )
    }
    </>
  );
};

export default Hero;
