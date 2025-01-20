import Link from "next/link";
import React from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItem: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItemsData.map((item, index) => (
          <Link href={item.url} key={index} passHref>
            <span
              className={`text-[16px] lg:text-[18px] font-medium cursor-pointer transition-all ${
                activeItem === index
                  ? "text-red-500 dark:text-[#37a39a] font-semibold" // Red in light mode, Teal in dark mode
                  : "text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="md:hidden flex flex-col items-center space-y-6 mt-5">
          {/* Brand Name */}
          <Link href="/" passHref>
            <span className="text-[24px] font-semibold text-black dark:text-white cursor-pointer">
              LearnNexus
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col w-full text-center space-y-4">
            {navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <span
                  className={`block w-full py-3 rounded-lg text-[18px] transition-all ${
                    activeItem === index
                      ? "bg-red-500 text-white dark:bg-[#37a39a] dark:text-black" // Active state
                      : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItem;
