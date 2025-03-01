"use client";

import DashboardHeader from "@/app/components/Admin/DashBoadrdHeader";
import AdminSidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import EditCourse from "@/app/components/Admin/Course/EditCourse";
import React from "react";
import Heading from "@/app/utils/Heading";

const Page = ({ params }: any) => {
  
  const id = params?.id;

  return (
    <div>
      <Heading
        title="LearnNexus - Admin"
        description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
        keywords="Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"
      />
      <div className="flex">
        <div className="w-[16%] max-w-[1500px]">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
