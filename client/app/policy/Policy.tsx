import React from "react";

type Props = {};

const Policy = (props: Props) => {
  const features = [
    "We protect your personal data",
    "Only collect essential user info",
    "Encrypted payment & security",
    "No third-party data selling",
    "Full control over your data",
    "You can request data deletion",
    "Cookies enhance your experience",
    "We’ll notify you of policy changes",
  ];
  return (
    <section className=" py-20 px-4 md:px-12">
      <div className="w-[95%] mx-auto flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE - Platform Terms & Privacy Policy */}
        <div className="w-full lg:w-[70%] space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Platform Terms &{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>

          <div className="text-lg text-black dark:text-white space-y-6 leading-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Section - 70% */}
              <div className="lg:col-span-8 space-y-6 text-[16px] leading-8">
                <p>
                  At LearnNexus, we value your trust. Our Privacy Policy
                  outlines the practices and measures we adopt to protect your
                  data and provide you with a secure learning experience.
                </p>

                <h2 className="text-xl font-semibold text-blue-500">
                  1. What We Collect
                </h2>
                <ul className="list-disc ml-6">
                  <li>Full name, email address, phone number</li>
                  <li>Course activity, progress history, quiz results</li>
                  <li>Billing details and transaction history</li>
                  <li>
                    Uploaded assignments or communication within the platform
                  </li>
                </ul>

                <h2 className="text-xl font-semibold text-blue-500">
                  2. How We Use Your Data
                </h2>
                <ul className="list-disc ml-6">
                  <li>
                    To personalize your learning dashboard and recommendations
                  </li>
                  <li>
                    To monitor course engagement and improve platform
                    performance
                  </li>
                  <li>To process course purchases and provide access</li>
                  <li>
                    To send email updates, reminders, or promotional offers
                  </li>
                </ul>

                <h2 className="text-xl font-semibold text-blue-500">
                  3. Your Rights & Controls
                </h2>
                <ul className="list-disc ml-6">
                  <li>
                    Access and review your personal data anytime from your
                    account settings
                  </li>
                  <li>
                    Request modification or deletion of your account and
                    associated data
                  </li>
                  <li>
                    Unsubscribe from marketing or promotional emails with a
                    single click
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - What You Get */}
        <div className="w-full lg:w-[30%]">
          <h2 className=" text-black dark:text-white text-2xl md:text-3xl font-semibold text-center lg:text-left mb-6">
            Unlock Privacy{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Highlights{" "}
            </span>
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

export default Policy;
