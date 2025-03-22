/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { styles } from "@/app/styless/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

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

  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      resizeImage(file, (resizedImage) => {
        setCourseInfo({ ...courseInfo, thumbnail: resizedImage });
      });
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
      resizeImage(file, (resizedImage) => {
        setCourseInfo({ ...courseInfo, thumbnail: resizedImage });
      });
    }
  };

  const resizeImage = (file: File, callback: (resizedImage: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to 500x300
        canvas.width = 500;
        canvas.height = 300;

        // Draw the resized image
        ctx.drawImage(img, 0, 0, 500, 300);
        const resizedImage = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality if needed
        callback(resizedImage);
      };
    };
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor=""> Course Name</label>
          <input
            type="name"
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
        <div>
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
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
              Estimated Price (optional)
            </label>
            <input
              type="number"
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
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label} `}>Course Tags</label>
            <input
              type="text"
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
          <div className="w-[48%]">
            <label className={`${styles.label} w-[50%]`}>Course Categories</label>
            <select
              className="dark:bg-slate-950 border border-gray-300 dark:border-gray-300 text-gray-900 dark:text-white rounded-lg block w-full p-2.5"
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((category: any) => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full">
          <input type="file" accept="image/*" id="file" className="hidden" onChange={handleFileChange} />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img src={courseInfo.thumbnail} alt="Thumbnail" className="w-full max-h-full object-cover" />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop a file here, or click to select a file
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex justify-end items-center">
          <input type="submit" value="Next" className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer" />
        </div>
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
