/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
  ComposedChart,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styless/style";
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery({});

  const analyticsData =
    data?.orders?.map((item: any) => ({
      name: item?.month,
      orders: item?.count, // Number of orders
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard ? "mt-[28px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Orders Performance Over the Last 12 Months
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              {/* Combination Chart (Bar + Line) */}
              <ComposedChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: "Orders", angle: -90, position: "insideLeft" }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: "Sales ($)", angle: -90, position: "insideRight" }} />
                <Tooltip />
                <Legend />
                
                {/* Bar Chart for Orders */}
                <Bar yAxisId="left" dataKey="orders" fill="#4d62d9" name="Orders" />
                
                {/* Line Chart for Sales Revenue */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sales"
                  stroke="#FF5733"
                  strokeWidth={2}
                  name="Sales Revenue"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
