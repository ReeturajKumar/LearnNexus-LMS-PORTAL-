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
  tempId?: string;
};

const EditCategories = () => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch()
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [data, error, layoutSuccess]);

  const handleCategoriesAdd = useCallback((id: string, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id || category.tempId === id
          ? { ...category, title: value }
          : category
      )
    );
  }, []);

  const newCategoryHandler = () => {
    if (
      categories.length === 0 ||
      categories[categories.length - 1].title.trim() !== ""
    ) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { title: "", tempId: `temp-${Date.now()}` },
      ]);
    } else {
      toast.error("Category title cannot be empty");
    }
  };

  const handleCategoryDelete = (id?: string, tempId?: string) => {
    if (categories.length === 1) {
      toast.error("At least one category is required!");
      return;
    }
    setCategories((prevCategories) =>
      prevCategories.filter(
        (category) => category._id !== id && category.tempId !== tempId
      )
    );
  };

  const areCategoriesUnchanged = useCallback(
    (originalCategories: Category[], newCategories: Category[]) => {
      return (
        JSON.stringify(originalCategories) === JSON.stringify(newCategories)
      );
    },
    []
  );

  const isAnyCategoryEmpty = useCallback((categories: Category[]) => {
    return categories.some((category) => category.title.trim() === "");
  }, []);

  const handleCategoryEdit = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories || [], categories) &&
      !isAnyCategoryEmpty(categories)
    ) {
      try {
        await editLayout({ type: "Categories", categories });
        toast.success("Categories updated successfully!");
      } catch (err) {
        toast.error("Failed to update categories");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={styles.title}>All Categories</h1>
          {categories.map((item, index) => (
            <div key={item._id || item.tempId || index} className="p-3">
              <div className="flex items-center justify-center w-full">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(
                      item._id || item.tempId!,
                      e.target.value
                    )
                  }
                  placeholder="Enter Category Name"
                />
                <AiOutlineDelete
                  className="dark:text-white text-black cursor-pointer ml-2"
                  onClick={() => handleCategoryDelete(item._id, item.tempId)}
                />
              </div>
            </div>
          ))}

          <div className="w-full flex justify-center mt-4">
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
                areCategoriesUnchanged(
                  data?.layout?.categories || [],
                  categories
                ) || isAnyCategoryEmpty(categories)
                  ? "!cursor-not-allowed opacity-50"
                  : "!cursor-pointer bg-blue-500 hover:bg-blue-600"
              }
              !rounded absolute bottom-12 right-12`}
            onClick={handleCategoryEdit}
            disabled={
              areCategoriesUnchanged(
                data?.layout?.categories || [],
                categories
              ) || isAnyCategoryEmpty(categories)
            }
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditCategories;
