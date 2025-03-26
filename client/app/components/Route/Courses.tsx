/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useGetAllCoursesQuery, useGetAlllUserCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import CourseCard from "../Course/CourseCard";

type Props = {}

const Courses = (props: Props) => {
  const {data,isLoading,error} = useGetAlllUserCoursesQuery({});
  const [courses,setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  },[data])

  useEffect(() => {
    console.log("Courses API Response:", data);
    setCourses(data?.courses || []);
  }, [data]);
  
  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>
      <h1 className="text-center font-poppins text-[25px] leading-[35px]sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
        Expand Your Career {" "}
        <span className='text-blue-500'> Oppertunity </span> <br />
          Opportunities With Our Courses
      </h1>
      <br />
      <br />

      <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:grid-gap-[35px] lg:grid-cols-3 lg:grid-gap-[35px] 1500px:grid-cols-4 1500px:grid-gap-[35px] mb-12 border-0'>

        {
          courses && courses.map((item: any, index: number) => (
            <CourseCard key={index} item={item} />
          ))
        }
      </div>
    </div>
  )
}

export default Courses