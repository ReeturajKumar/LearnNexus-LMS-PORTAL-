"use client"
import DashboardHeader from '../../../app/components/Admin/DashBoadrdHeader'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import UserAnalytics from '../../components/Admin/Analytics/UserAnalytics'

import React from 'react'
import Heading from '@/app/utils/Heading';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="LearnNexus - Admin"
        description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
        keywords="Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"
      />
     <div className="flex">
      <div className="1500w-[16%] w-1/5">
        <AdminSidebar/>
      </div>
      <div className="w-[85%]">
        <DashboardHeader/>
        <UserAnalytics/>
      </div>
     </div>
    </div>
  )
}

export default page