/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCourseContentUserQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import CourseContentList from './CourseContentList';

type Props = {
  id: string;
  user:any;
};

const CourseContentUser = ({ id,user }: Props) => {
  const { data: contentData, isLoading,refetch } = useGetCourseContentUserQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          <div className="pb-20">
            <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          </div>

          {/* Main Grid Layout */}
          <div className="w-full grid grid-cols-1 md:grid-cols-10 gap-6 px-4">
            {/* Left: Course Player (70%) */}
            <div className="md:col-span-7 w-full">
              <Heading
                title={data[activeVideo]?.title}
                description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
                keywords={data[activeVideo]?.tags}
              />
              <CourseContentMedia data={data} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} user={user} refetch={refetch} />
            </div>

            {/* Right: Course Content List (30%) - Compact & Professional */}
            <div className="md:col-span-3 w-full ">
              <CourseContentList data={data} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContentUser;