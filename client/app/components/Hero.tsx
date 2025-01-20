import Image from 'next/image';
import React, { FC } from 'react';
import bannerImage from '../../public/assets/Banner.png';
import H1 from '../../public/assets/H1.jpg';
import H2 from '../../public/assets/H2.jpg';
import H3 from '../../public/assets/H3.jpg';

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full h-screen flex flex-col sm:flex-row items-center justify-between relative overflow-hidden ">
      {/* Left Section: Banner Image */}
      <div className="w-full sm:w-1/2 h-full flex items-center justify-center relative p-10">
        {/* Applying the global hero_animation class */}
        <div className="hero_animation absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full z-[-1]"></div>
        <Image
          src={bannerImage}
          alt="Hero"
          className="z-10 object-contain max-w-full h-auto"
        />
      </div>

      {/* Right Section: Content */}

      <div className="w-full sm:w-1/2 h-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center px-6 md:px-12 lg:px-16">
  <h2 className="text-[28px] sm:text-[36px] md:text-[48px] xl:text-[60px] font-semibold leading-tight sm:leading-[50px] md:leading-[60px] xl:leading-[70px]">
    <span className="text-black dark:text-white">
      Improve Your Online Learning Experience
    </span>{' '}
    <br />
    <span className="text-blue-500">
      Better Instantly
    </span>
  </h2>
  <p className="text-sm sm:text-base mt-4 max-w-lg">
    <span className="text-gray-700 dark:text-gray-300">
      We have 40k+ online courses & 500k+ online registered students. Find
      your desired courses from them.
    </span>
  </p>
  <div className="mt-6 flex w-full max-w-md">
    <input
      type="text"
      placeholder="Search Courses..."
      className="flex-1 px-4 py-2 rounded-l-md border-none outline-none text-black dark:text-white bg-gray-100 dark:bg-gray-800"
    />
    <button className="px-6 py-2 bg-blue-600 text-white rounded-r-md">
      Search
    </button>
  </div>
  <div className="mt-8 flex items-center gap-4">
    <div className="flex -space-x-2 overflow-hidden">
      <Image
        src={H1}
        alt="User 1"
        className="w-10 h-10 rounded-full border-2 border-white"
      />
      <Image
        src={H2}
        alt="User 2"
        className="w-10 h-10 rounded-full border-2 border-white"
      />
      <Image
        src={H3}
        alt="User 3"
        className="w-10 h-10 rounded-full border-2 border-white"
      />
    </div>
    <p className="text-sm">
      <span className="text-black dark:text-white font-medium">
        500k+
      </span>{' '}
      <span className="text-gray-700 dark:text-gray-300">
        People already trusted us.{' '}
      </span>
      <a href="#" className="text-green-500 underline">
        View Courses
      </a>
    </p>
  </div>
</div>

    </div>
  );
};

export default Hero;
