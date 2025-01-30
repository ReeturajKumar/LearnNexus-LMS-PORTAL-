/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.webp";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"}

        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt="Avatar"
          width={40}
          height={40}
          className=" 800px:w-[30px] 800px:h-[30px] rounded-full w-[40px] h-[40px] object-cover"
        />
        <h5 className="pl-5 800px:block font-Poppins text-black dark:text-white ">My Profile</h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          width={40}
          height={40}
          className=" 800px:w-[30px] 800px:h-[30px] rounded-full w-[40px] h-[40px] object-cover text-black dark:text-white"
        />
        <h5 className="pl-5 800px:block font-Poppins text-black dark:text-white ">Change Password</h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          width={40}
          height={40}
          className=" 800px:w-[30px] 800px:h-[30px] rounded-full w-[40px] h-[40px] object-cover text-black dark:text-white"
        />
        <h5 className="pl-5 800px:block font-Poppins text-black dark:text-white ">Enrolled Courses</h5>
      </div>

      {
        user.role === "admin" && (
          <Link
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 6 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
            }`}
           href= {`/admin`}
          >
            <MdAdminPanelSettings
              width={40}
              height={40}
              className=" 800px:w-[30px] 800px:h-[30px] rounded-full w-[40px] h-[40px] object-cover text-black dark:text-white"
            />
            <h5 className="pl-5 800px:block font-Poppins text-black dark:text-white ">Admin Panel</h5>
          </Link>
        )
      }



      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout
          width={40}
          height={40}
          className=" 800px:w-[30px] 800px:h-[30px] rounded-full w-[40px] h-[40px] object-cover text-black dark:text-white"
        />
        <h5 className="pl-5 800px:block font-Poppins text-black dark:text-white ">Logout</h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
