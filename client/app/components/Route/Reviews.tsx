/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import ReviewsCard from "./ReviewsCard";
import Image from "next/image";
import img1 from '@/public/assets/U1.jpg'
import img2 from '@/public/assets/U2.jpg'
import img3 from '@/public/assets/U3.webp'
import img4 from '@/public/assets/U4.jpeg'
import img5 from '@/public/assets/U5.jpeg'
import img6 from '@/public/assets/U6.jpg'


type Props = {
  reviews: {
    name: string;
    avatar: string;
    profession: string;
    comment: string;
  }[];
};

export const reviews = [
  {
    name: "Aarav Mehta",
    avatar: img1,
    profession: "Student",
    company: "IIT Bombay",
    comment:
      "I had the pleasure of exploring LearnNexus, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience...",
    rating: 5,
  },
  {
    name: "Neha Sharma",
    avatar: img2,
    profession: "Computer Science Student",
    company: "Delhi University",
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch...",
    rating: 4,
  },
  {
    name: "Richa Verma",
    avatar: img3,
    profession: "Full Stack Developer",
    company: "TCS",
    comment:
      "Thanks for your amazing programming tutorial channel! Your ability to break down complex topics into manageable parts is impressive...",
    rating: 5,
  },
  {
    name: "Priya Iyer",
    avatar: img4,
    profession: "Junior Web Developer",
    company: "Infosys",
    comment:
      "I had the pleasure of exploring LearnNexus, a website that provides an extensive range of courses on various tech-related topics...",
    rating: 4,
  },
  {
    name: "Vaibhavi Singh",
    avatar: img5,
    profession: "Data Scientist",
    company: "Microsoft India",
    comment:
      "The in-depth and well-structured courses at LearnNexus helped me master machine learning concepts with ease. The real-world projects were a game-changer for my career.",
    rating: 5,
  },
  {
    name: "Ananya Rao",
    avatar: img6,
    profession: "UI/UX Designer",
    company: "Adobe India",
    comment:
      "LearnNexus provided me with an amazing learning experience! The design courses were hands-on, and the mentorship helped me land my dream job in UI/UX.",
    rating: 4,
  }
];


const Reviews = () => {
  return (
    <div className="w-[90%] md:w-[85%] mx-auto py-12">
       <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={require("../../../public/assets/Business.png")}
            width={600}
            height={600}
            alt="Reviews"
            className="rounded-lg"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-bold leading-snug dark:text-white text-black">
            Our Students Are <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Our Strength</span>
            <br /> See What They Say About Us
          </h3>
          <p className="mt-4 text-gray-400 text-lg">
            We take pride in the impact we make. Our students&apos; success speaks for itself,  
            with real testimonials showcasing how our platform has transformed their learning journey.  
            Discover firsthand how we&apos;ve helped thousands achieve their goals and build rewarding careers.
          </p>
        </div>
      </div>

      {/* Grid Layout - Responsive */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((i, index) => (
          <ReviewsCard item={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
