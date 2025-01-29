"use client";
import React, { FC, useState, useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
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
    </div>
  );
};

export default Profile;
