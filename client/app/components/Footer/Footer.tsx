import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-8 border border-[#0000000e]  py-8">
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-base text-black dark:text-white hover:text-gray-500">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-base text-black dark:text-white hover:text-gray-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://hiretrack.vercel.app/" className="text-base text-black dark:text-white hover:text-gray-500">
                  Career Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-base text-black dark:text-white hover:text-gray-500">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-base text-black dark:text-white hover:text-gray-500">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-base text-black dark:text-white hover:text-gray-500">
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-base text-black dark:text-white hover:text-gray-500">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="/" className="text-base text-black dark:text-white hover:text-gray-500">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/" className="text-base text-black dark:text-white hover:text-gray-500">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="text-[20px] font-semibold text-black dark:text-white">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="text-base text-black dark:text-white hover:text-gray-500">
                  Call Us: +91 0000000000
                </p>
              </li>
              <li>
                <p className="text-base text-black dark:text-white hover:text-gray-500">
                  Email Us: learnnexus3@gmail.com
                </p>
              </li>
              <li>
                <p className="text-base text-black dark:text-white hover:text-gray-500">
                  Address: 123, ABC Street, XYZ City
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} LearnNexus. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
