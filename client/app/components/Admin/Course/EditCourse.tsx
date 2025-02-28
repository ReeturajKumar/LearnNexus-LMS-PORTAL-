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
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse,{isSuccess,error}] = useEditCourseMutation();
  const {data } = useGetAllCoursesQuery(
    {},{ refetchOnMountOrArgChange: true }
  );

  const editCourseDta = data && data.courses.find((item: any) => item._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if(error){if("data" in error){const errorMessage = error as any;toast.error(errorMessage.data.message);}}
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (editCourseDta) {
      setCourseInfo({
        name: editCourseDta.name,
        description: editCourseDta.description,
        price: editCourseDta.price,
        estimatedPrice: editCourseDta?.estimatedPrice,
        tags: editCourseDta.tags,
        level: editCourseDta.level,
        demoUrl: editCourseDta.demoUrl,
        thumbnail: editCourseDta?.thumbnail?.url,
      });
      setBenefits(editCourseDta.benefits);
      setprereqisites(editCourseDta.prereqisites);
      setCourseContentData(editCourseDta.courseData);
      setCourseData(editCourseDta);
    }
  }, [editCourseDta]);

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
  const [prereqisites, setprereqisites] = useState([
    { id: Date.now(), title: "" },
  ]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: " Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});



  const handleSubmit = async () => {
    const formatedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formatedPrereqisites = prereqisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formatedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formatedBenefits,
      prereqisites: formatedPrereqisites,
      courseContent: formatedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:editCourseDta?._id,data});
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prereqisites={prereqisites}
            setprereqisites={setprereqisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
