"use client"
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useGetCourseDetailsQuery(id);
if (error) return <div>Error loading course details.</div>;

  return (
    <>
    {
      isLoading ? (
        <Loader/>
      ) : (
        <div >
          <Heading
         title={data?.course?.name ?? "Loading Course..."}
          description="LearnNexus is a platform that provides a wide range of courses and resources for learning and self-improvement."
          keywords={data?.course?.tags}
        />
        <Header
         route={route}
         setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={1}
        />
        <CourseDetails data={data?.course}/>
        <Footer />
        </div>
      )
    }
    </>
  )
}

export default CourseDetailsPage;
