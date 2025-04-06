"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtexted";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className="min-h-screen">
        <Protected>
          <Heading
            title={`${user?.name || "User"} Profile - LearnNexus`}
            description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
            keywords="Programming, MERN, Redux, React, Next.js, Machine Learning, Data Science"
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />
          {user && <Profile user={user} />}
        </Protected>
      </div>
      <Footer />
    </>
  );
};

export default Page;
