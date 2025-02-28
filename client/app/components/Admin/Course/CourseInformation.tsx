/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { styles } from "@/app/styless/style";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor=""> Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className={`${styles.input}`}
            id="name"
            placeholder="MERN Stack LMS platform using nextjs and tailwindcss"
          />
        </div>
        <br />
        <div className="">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="MERN Stack LMS platform using nextjs and tailwindcss"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={`${styles.input}`}
              id="price"
              placeholder="1000"
            />
          </div>
          <div>
            <label className={`${styles.label} w-[50%]`}>
              Estimeted Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={`${styles.input}`}
              id="estimatedPrice"
              placeholder="500"
            />
          </div>
        </div>
        <br />
        <div>
          <label className={`${styles.label} `}>Course Tags</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className={`${styles.input}`}
            id="tags"
            placeholder="MERN Stack, Nextjs, Tailwindcss"
          />
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.input}`}
              id="level"
              placeholder="Beginner / Intermediate / Advance"
            />
          </div>
          <div>
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={`${styles.input}`}
              id="demoUrl"
              placeholder="https://www.example.com"
            />
          </div>
        </div>

        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className="w-full max-h-full object-cover" />
              ) : (
                <span className="text-black dark:text-white">
                  Drag and drop a file here, or click to select a file
                </span>
              )
            }
          </label>
        </div>
        <br />
        <div
          className="w-full flex justify-end items-center">
            <input type="submit" 
            value="Next"
            className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
             />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
