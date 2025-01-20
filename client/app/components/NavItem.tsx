import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItem: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden 800px:flex">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
              } text-[18px] px-6 font-Poppins font-[400] cursor-pointer`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile View */}
      {isMobile && (
        <div className="800px:hidden mt-5 ">
          <div className="w-full text-center py-8">
            <Link href={"/"} passHref>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white cursor-pointer">
                LearnNexus
              </span>
            </Link>
          </div>
          <div className="flex flex-col space-y-6">
            {navItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } text-[18px] px-6 font-Poppins font-[400] cursor-pointer text-center py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all`}
                >
                  {i.name}
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
