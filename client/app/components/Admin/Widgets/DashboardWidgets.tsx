/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { FC } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Invoices/AllInvoices";

type Props = {
  open: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[70%,30%]">
        <div className="p-8 ">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[30px] pr-8">
          <div className="w-full dark:bg-[#111C43] bg-white rounded-md shadow-md my-8 p-6">
            {/* Top Section */}
            <div className="flex items-center justify-between">
              {/* Icon & Stats */}
              <div className="flex flex-col items-start space-y-2">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[36px]" />
                <h5 className="font-poppins dark:text-white text-black text-[24px] font-semibold">
                  120
                </h5>
                <p className="font-poppins dark:text-white text-black text-[18px] font-medium">
                  Sales Obtained
                </p>
              </div>

              {/* Circular Progress */}
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center text-lg font-semibold pt-2 text-green-500">
                  +120%
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] bg-white rounded-md shadow-md my-8 p-6">
            {/* Top Section */}
            <div className="flex items-center justify-between">
              {/* Icon & Stats */}
              <div className="flex flex-col items-start space-y-2">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[36px]" />
                <h5 className="font-poppins dark:text-white text-black text-[24px] font-semibold">
                  450
                </h5>
                <p className="font-poppins dark:text-white text-black text-[18px] font-medium">
                  New Users
                </p>
              </div>

              {/* Circular Progress */}
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center text-lg font-semibold pt-2 text-green-500">
                  +150%
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%] ">
      <div className="p-8"> 
  <OrdersAnalytics isDashboard={true} />
</div>



        <div className="p-5">
          <h5 className="font-poppins dark:text-white text-black text-[24px] font-semibold">
            Recent Transaction
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
