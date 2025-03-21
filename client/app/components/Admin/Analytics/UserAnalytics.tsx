/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  AreaChart,
  Area,
  Tooltip
} from "recharts"
import Loader from '../../Loader/Loader'
import { useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import { styles } from '@/app/styless/style'

type Props = {
  isDashboard?: boolean
}

// const analyticsData = [
//   {name: "Januare 2023", count: 233},
//   {name: "February 2023", count: 283},
//   {name: "March 2023", count: 433},
//   {name: "April 2023", count: 333},
//   {name: "May 2023", count: 833},
//   {name: "June 2023", count: 233},
//   {name: "July 2023", count: 239},
//   {name: "August 2023", count: 233},
//   {name: "September 2023", count: 263},
//   {name: "October 2023", count: 633},
//   {name: "November 2023", count: 273},
//   {name: "December 2023", count: 433},
// ]

const UserAnalytics = ({isDashboard}: Props) => {

    const {data,isLoading} = useGetUsersAnalyticsQuery({});

    const analyticsData = data?.users?.map((item: any) => ({
      name: item?.month,
      count: item?.count, // Ensure this matches dataKey
    })) || [];


  console.log("Analytics Data: ", analyticsData);



    const minValue = 0;

  return (
    <>
    {
      isLoading? (
        <Loader/>
      ) : (
        <div className={`${isDashboard ? "mt-[50px]" : "mt-[50px]  shadow-sm pb-5 rounded-sm"}`}>
          <div className={`${isDashboard ? "ml-8 mb-5" : ""}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
              User Analytics
            </h1>
           {
            !isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data {" "}
              </p>
            )
           }
          </div>
          <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
            <ResponsiveContainer width={isDashboard ? "100%" : "90%"} height={!isDashboard ? "50%" : "100%"}>
            <AreaChart 
  data={analyticsData}
  margin={{
    top: 20,
    right: 30,
    left: 0,
    bottom: 0,
  }}
>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="#4d62d9" />
</AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
    </>
  )
}

export default UserAnalytics