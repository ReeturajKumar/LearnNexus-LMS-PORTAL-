// components/About.tsx

import React from "react";

const About: React.FC = () => {
  const features = [
    "Real-world projects to build your portfolio",
    "Lifetime access to all enrolled courses",
    "Live coding workshops and hackathons",
    "Supportive community of learners & mentors",
    "Resume building and career prep tools",
    "Certificates on course completion",
    "Affordable pricing – no hidden fees",
    "Learn at your own pace – 24/7 access",
    "Exclusive internship and job opportunities",
  ];

  return (
    <section className=" py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* LEFT SIDE - What is LearnNexus */}
        <div className="w-full lg:w-[70%] space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            What is <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">LearnNexus?</span>
          </h1>

          <div className="text-lg text-black dark:text-white space-y-6 leading-8">
            <p>
              Are you ready to take your programming skills to the next level? Look no further than LearnNexus, the premier programming community dedicated to helping new programmers achieve their goals and reach their full potential.
            </p>
            <p>
              As the founder and CEO of LearnNexus, I know firsthand the challenges that come with learning and growing in the programming industry. That’s why I created LearnNexus – to provide new programmers with the resources and support they need to succeed.
            </p>
            <p>
              Our YouTube channel is a treasure trove of informative videos on everything from programming basics to advanced techniques. But that’s just the beginning. Our affordable courses are designed to give you the high-quality education you need to succeed in the industry, without breaking the bank.
            </p>
            <p>
              At LearnNexus, we believe that price should never be a barrier to achieving your dreams. That’s why our courses are priced low – so that anyone, regardless of their financial situation, can access the tools and knowledge they need to succeed.
            </p>
            <p>
              But LearnNexus is more than just a community – we&apos;re a family. Our supportive community of like-minded individuals is here to help you every step of the way, whether you’re just starting out or looking to take your skills to the next level.
            </p>
            <p>
              With LearnNexus by your side, there&apos;s nothing standing between you and your dream job. Our courses and community will provide you with the guidance, support, and motivation you need to unleash your full potential and become a skilled programmer.
            </p>
            <p>
              So what are you waiting for? Join the LearnNexus family today and let’s conquer the programming industry together! With our affordable courses, informative videos, and supportive community, the sky&apos;s the limit.
            </p>
          </div>

          <div className="mt-8">
            {/* <Image src={Signature} alt="Signature" width={180} height={80} className="mx-0" /> */}
            <span className="block text-lg font-semibold text-black dark:text-white">Reeturaj Kumar</span>
            <h5 className="text-sm text-gray-600 dark:text-gray-300">Founder and CEO of LearnNexus</h5>
          </div>
        </div>

        {/* RIGHT SIDE - What You Get */}
        <div className="w-full lg:w-[30%]">
          <h2 className=" text-black dark:text-white text-2xl md:text-3xl font-semibold text-center lg:text-left mb-6">
          Unlock Benefits With <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> LearnNexus </span>
          </h2>

          <div className="space-y-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-[#1e293b]  rounded-xl px-4 py-3 text-sm md:text-base  text-black dark:text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
