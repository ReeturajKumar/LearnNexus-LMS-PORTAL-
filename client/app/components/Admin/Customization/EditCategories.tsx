/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styless/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Category = {
  _id?: string;
  title: string;
};

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [data, error, layoutSuccess, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories:any) =>
      prevCategories.map((i:any) =>
       i._id === id ? { ...i, title: value }
          : i
      )
    );
  }

  const newCategoryHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else{
      setCategories((prevCategories:any) => 
        [...prevCategories,{ title: "", }]);
    }
  };

  const areCategoriesUnchanged =(
    originalCategories: any[], newCategories: any[]) => {
      return (
        JSON.stringify(originalCategories) === JSON.stringify(newCategories)
      );
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };


  const handleCategoryEdit = async () => {
    if (!areCategoriesUnchanged(data?.layout?.categories ,categories) &&
      !isAnyCategoryTitleEmpty(categories)) {
      await editLayout({ type: "Categories", categories });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={styles.title}>All Categories</h1>
          {categories.map((item: any, index: number) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="p-3">
              <div className="flex items-center justify-center w-full">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(
                      item._id,
                      e.target.value
                    )
                  }
                  placeholder="Enter Category Name"
                />
                <AiOutlineDelete
                  className="dark:text-white text-black cursor-pointer ml-2"
                  onClick={() =>{
                    setCategories((prevCategories:any) => prevCategories.filter((i:any) => i._id !== item._id));
                  }}
                />
              </div>
            </div>
            )
          })}

          <br />
          <br />

          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black cursor-pointer"
              onClick={newCategoryHandler}
            />
          </div>

          <button
            className={`${
              styles.button
            } !w-[100px] !h-[40px] mt-4 dark:text-white text-black bg-[#cccccc34]
              ${
                areCategoriesUnchanged(data.layout.categories,categories) || isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer bg-blue-500 hover:bg-blue-600"
              }
              !rounded absolute bottom-12 right-12`}
            onClick={areCategoriesUnchanged(data.layout.categories,categories) || isAnyCategoryTitleEmpty(categories) ? () => 
              null : handleCategoryEdit}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditCategories;
