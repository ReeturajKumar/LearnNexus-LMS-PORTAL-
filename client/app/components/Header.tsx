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

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openSideBar ? "hidden" : "auto";
  }, [openSideBar]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 transition duration-300">
      <div
        className={`w-full h-[80px] flex items-center justify-between px-6 md:px-12 lg:px-16 shadow-md ${
          active ? "shadow-lg" : ""
        } border-b border-black/20 dark:border-white/20`}
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-black dark:text-white">
          LearnNexus
        </Link>

        {/* Navigation & Theme Switcher */}
        <div className="flex items-center">
          <NavItem activeItem={activateItem} isMobile={false} />
          <ThemeSwitcher />

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <HiOutlineMenuAlt3
              size={25}
              className="ml-3 cursor-pointer dark:text-white text-black"
              onClick={() => setOpenSideBar(true)}
            />
          </div>

          {/* User Icon */}
          <HiOutlineUserCircle
            size={25}
            className="ml-3 cursor-pointer dark:text-white text-black"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {/* Sidebar */}
      {openSideBar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-50 bg-black/50"
          onClick={handleClose}
          id="screen"
        >
          <div className="w-[70%] h-screen bg-white dark:bg-gray-900 fixed top-0 right-0 p-6">
            <NavItem activeItem={activateItem} isMobile={true} />
            <HiOutlineUserCircle
              size={25}
              className="cursor-pointer mt-8 ml-5 text-black dark:text-white"
              onClick={() => setOpen(true)}
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
              © 2024 LearnNexus
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
