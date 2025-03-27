/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadeUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React from "react";
import CourseContentUser from "../../components/Course/CourseContentUser";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { isLoading, error, data } = useLoadeUserQuery(undefined, {});

  if (error) {
    redirect("/");
  }

  if (!isLoading && data && resolvedParams) {
    const isPurchased = data.user?.courses?.some((item: any) => item._id === resolvedParams.id);

    if (!isPurchased) {
      redirect("/");
    }
  }

  return isLoading || !resolvedParams ? <Loader /> : <CourseContentUser id={resolvedParams.id} user={data.user} />;
};

export default Page;
