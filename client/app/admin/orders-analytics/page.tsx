/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import DashboardHeader from '../../../app/components/Admin/DashBoadrdHeader'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import React from 'react'
import Heading from '@/app/utils/Heading';
import OrdersAnalytics from '@/app/components/Admin/Analytics/OrdersAnalytics';

type Props = {}

const Page = (props: Props) => {
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
        <OrdersAnalytics/>
      </div>
     </div>
    </div>
  )
}

export default Page