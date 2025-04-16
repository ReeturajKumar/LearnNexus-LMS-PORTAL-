/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import socketIo from "socket.io-client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open = false, setOpen = () => {} }) => {
  const socket = useRef<any>(null);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any[]>([]);

  const [audio] = useState(
    new Audio("https://res.cloudinary.com/drlhqtqeb/video/upload/v1743866939/ds28oih02progkl8pk7w.mp3")
  );

  const playNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  useEffect(() => {
    socket.current = socketIo(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.current.on("newNotification", (data: any) => {
      console.log("New notification received:", data);
      refetch();
      playNotificationSound();
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [playNotificationSound, refetch]);

  useEffect(() => {
    if (data) {
      setNotifications(data.notifications.filter((item: any) => item.status === "unread"));
    }

    if (isSuccess) {
      refetch();
    }

    audio.load();
  }, [audio, data, isSuccess, refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-3 fixed top-5 right-0 z-50">
      <ThemeSwitcher />
      <div className="relative cursor-pointer ml-3" onClick={() => setOpen(!open)}>
        <NotificationsOutlinedIcon className="text-2xl dark:text-white text-black" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications.length}
          </span>
        )}

        {/* Dropdown */}
        {open && (
          <div className="w-[350px] max-h-[60vh] overflow-y-auto py-3 px-3 border border-[#ffffff0c] dark:bg-[#0e1633] bg-white absolute right-0 top-12 shadow-xl rounded-md">
            <h5 className="text-center py-2 text-black dark:text-white text-[20px] font-poppins font-semibold">
              Notifications
            </h5>
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 mt-5 font-poppins">
                No new notifications
              </p>
            ) : (
              notifications.map((item: any, index: number) => (
                <div
                  key={item._id || index}
                  className="mb-3 p-3 rounded-lg dark:bg-[#2d3a4e] bg-[#f3f4f6] shadow-sm"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-black dark:text-white">{item.title}</p>
                    <button
                      className="text-sm text-blue-500 hover:underline"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{format(item.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
