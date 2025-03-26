/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadeUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React from "react";
import CourseContentUser from "../../components/Course/CourseContentUser";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadeUserQuery(undefined, {});

  if (error) {
    redirect("/");
  }

  if (!isLoading && data) {
    const isPurchased = data.user?.courses?.some((item: any) => item._id === id);

    if (!isPurchased) {
      redirect("/");
    }
  }

  return isLoading ? <Loader /> : <CourseContentUser id={id} user={data.user} />;
};

export default Page;
