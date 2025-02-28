/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

  const editCourseData = data?.courses.find((item: any) => item._id === id);

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      refetch(); // Fetch updated course data
      redirect("/admin/courses"); // Navigate after success
    }

    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error, refetch, router]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ id: Date.now(), title: "" }]);
  const [prereqisites, setPrereqisites] = useState([{ id: Date.now(), title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrereqisites(editCourseData.prereqisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const handleCourseCreate = async () => {
    const formattedData = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: benefits.map((b) => ({ title: b.title })),
      prereqisites: prereqisites.map((p) => ({ title: p.title })),
      courseData: courseContentData.map((content) => ({
        videoUrl: content.videoUrl,
        title: content.title,
        description: content.description,
        videoSection: content.videoSection,
        links: content.links.map((link) => ({ title: link.title, url: link.url })),
        suggestion: content.suggestion,
      })),
    };

    await editCourse({ id: editCourseData?._id, data: formattedData });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive} />
        )}
        {active === 1 && (
          <CourseData benefits={benefits} setBenefits={setBenefits} prereqisites={prereqisites} setprereqisites={setPrereqisites} active={active} setActive={setActive} />
        )}
        {active === 2 && (
          <CourseContent active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={undefined} />
        )}
        {active === 3 && (
          <CoursePreview active={active} setActive={setActive} courseData={courseInfo} handleCourseCreate={handleCourseCreate} isEdit={true} />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
