"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItem from "../components/NavItem";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activateItem: number;
};

const Header: FC<Props> = ({ activateItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  // Handle scroll event to change active state
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup event listener
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    document.body.style.overflow = openSideBar ? "hidden" : "auto";
  }, [openSideBar]);

  // Close sidebar when clicking outside of it
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="text-[25px] font-poppins font-[500] text-black dark:text-white"
              >
                LearnNexus
              </Link>
            </div>
            <div className="flex items-center">
              <NavItem activeItem={activateItem} isMobile={false} />
              <ThemeSwitcher />
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="ml-3 cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="ml-3 cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItem activeItem={activateItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer mt-8 ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white mt-4">
                Copyright © 2024 LearnNexus
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
