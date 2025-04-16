/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState, useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetAlllUserCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar] = useState(null);
  const [courses, setCourses] = useState([]);
  const {data} = useGetAlllUserCoursesQuery(undefined,{});
  const [logOut, setlogOut] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logOut ? true : false,
  });

  const logOutHandler = async () => {
    setlogOut(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
      .map((userCourses:any) => 
        data.courses.find((course: any) => course._id === userCourses._id))
      .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <div className="w-[85%] flex mx-auto pt-10 px-4">
      {/* Sidebar */}
      <div
        className={`w-[310px] md:w-[310px] h-[450px] dark:bg-slate-900 rounded-2lg shadow-lg mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full  bg-transparent mt-[80px] ">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full  bg-transparent mt-[80px] ">
          <ChangePassword />
        </div>
      )}

{active === 3 && (
  <div className="w-full mt-[80px] px-4">
    {courses.length > 0 ? (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">

        {courses.map((item: any, index: number) => (
          <CourseCard key={index} item={item} isProfile={true} />
        ))}
      </div>
    ) : (
      <h1 className="text-center font-poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white mt-6 text-[#000] font-[700] tracking-tight">
        You have not enrolled in any course
      </h1>
    )}
  </div>
)}

    </div>
  );
};

export default Profile;
