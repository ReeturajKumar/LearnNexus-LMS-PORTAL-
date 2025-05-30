/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AdminProtected from '../hooks/adminProtected'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
      <Heading
        title="LearnNexus - Admin"
        description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
        keywords="Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"
      />
      <div className='flex h-[200vh]'>
        <div className='1500px:w-[50%] w-1/5'>
        <AdminSidebar/>
        </div>
        <div className="w-[85%]">
        <AdminDashboard isDashboard={true}/>
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default page