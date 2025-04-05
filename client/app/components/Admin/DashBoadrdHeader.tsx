/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { FC, useEffect, useState} from 'react'
import { ThemeSwitcher } from '../ThemeSwitcher'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import socketIo from "socket.io-client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationApi';
import { format } from 'timeago.js';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT,{
  transports: ["websocket"],});

type Props = {
  open?: boolean;
  setOpen?: any
}

const DashBoadrdHeader: FC<Props>= ({open, setOpen}) => {
  const {data,refetch} = useGetAllNotificationsQuery(undefined,{refetchOnMountOrArgChange:true})

  const [updateNotificationStatus, {isSuccess}] = useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/drlhqtqeb/video/upload/v1743866939/ds28oih02progkl8pk7w.mp3"
    ));


  const playerNotificationSound = () => {
    audio.play();
  }

  useEffect(() => {
   if(data){
    setNotifications(
      data.notifications.filter((item: any) => item.status === "unread")
    );
   }

   if(isSuccess){
    refetch();
   }
   audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationSound();
    })
  }, []);


  const handleNotificationStatusChange = async (id: any) => {
    await updateNotificationStatus(id);
  }
  
  

  return (
    <div className='w-full flex items-center justify-end p-3 fixed top-5 right-0'>
      <ThemeSwitcher />
        <div className='relative cursor-pointer mr-2'
        onClick={() => setOpen(!open)}
        >
          <NotificationsOutlinedIcon className='text-2xl cursor-pointer dark:text-white text-black'/>
          <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
            {notifications && notifications.length}
          </span>
        </div>
        {
          open && (
            <div className='w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#0e1633] bg-white absolute top-16 shadow-xl z-50 rounded'>

              <h5 className='text-center py-3 text-black dark:text-white text-[20px] font-poppins'>
                Notifications
              </h5>
              {
                notifications && notifications.map((item: any,index: number) => (
                  <div className='dark:bg-[#2d3a4e] bg-[#00000013] font-poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                  <div className='w-full flex items-center justify-between p-2'>
                    <p className='text-black dark:text-white'>
                      {item.title}
                    </p>
                    <p className='text-black dark:text-white cursor-pointer'
                    onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className='px-2 text-black dark:text-white'>
                    {item.message}
                  </p>
                  <p className='p-2 text-black dark:text-white text-[14px]'>
                   {format(item.createdAt)}
                  </p>
                </div>
                ))
              }
            </div>
          )
        }
    </div>
  )
}

export default DashBoadrdHeader