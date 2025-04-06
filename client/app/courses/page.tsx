'use client'
import { useGetAlllUserCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { styles } from '../styless/style';
import CourseCard from '../components/Course/CourseCard';

type Props = {}

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const {data,isLoading} = useGetAlllUserCoursesQuery(undefined,{})
  const {data:categoriesData} = useGetHeroDataQuery("Categories",{});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");



  useEffect(() => {
    if(category === "All"){
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(data?.courses.filter((item: any) => item.categories === category));
    }
    if(search){
      setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
    }
  },[category,data,search]);

  const categories = categoriesData?.layout.categories;
  return (
    <div>
      {
        isLoading ? (
          <Loader/>
        ) : (
          <>
          <Header
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={1}
          />
          <div className='mt-20'>
          <div className='w-[95%] 800px:w-[85%] m-auto min-h-screen'>
            <Heading
              title={"All Courses - LearnNexus"}
              description={"LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."}
              keywords={"Programming,MERN,Redux,React,Nextjs,Machine learning,Data science"}
            />
            <br />
            <div className='w-full flex items-center flex-wrap'>
              <div 
                className={`h-[35px] ${category === 'All' ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer font-poppins`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories && categories.map((item: any, index: number) => (
                <div key={index}>
                  <div
                    className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer font-poppins`}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            {
              courses && courses.length === 0 && (
                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                  {search ? `No course found!` : "No course found in this category. Please choose another category."}
                </p>
              )
            }
            <br />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                courses && courses.map((item: any, index: number) => (
                  <CourseCard key={index} item={item} />
                ))
              }
            </div>
            <br />
            <br />
          </div>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Page