/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { Box } from '@mui/material'
import { DataGrid,GridToolbar } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
import { AiOutlineMail } from 'react-icons/ai'
import { useGetOrdersQuery } from '@/redux/features/orders/ordersApi'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'




type Props = {
  isDashboard?:boolean
}

const AllInvoices = ({isDashboard}: Props) => {
  const {theme,setTheme} = useTheme()
  const {isLoading,data} = useGetOrdersQuery({});
  const {data:userData} = useGetAllUsersQuery({});
  const {data:courseData} = useGetAllCoursesQuery({});

  const [orderData,setOrderData] = useState<any>([]);


  useEffect(() => {
    if (data?.orders && userData?.users && courseData?.courses) {
      const temp = data.orders.map((item: any) => {
        const user = userData.users.find((user: any) => user._id === item.userId);
        const course = courseData.courses.find((course: any) => course._id === item.courseId);
        return {
          ...item,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "N/A",
          title: course?.name || "N/A",
          price: course?.price ? `$${course.price}` : "N/A",
        };
      });
      setOrderData(temp);
    } else {
      setOrderData([]); // Ensure orderData is always an array
    }
  }, [data, userData, courseData]);
  
  

  const columns : any = [
    {field: "id", headerName: "ID", flex: 0.5},
    {field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5},
    ...(isDashboard ? [] 
      : 
      [
        {field: "userEmail", headerName: "Email", flex: 1},
        {field: "title", headerName: "Course Title", flex: 1},
    ]),
    {field: "price", headerName: "Price", flex: 0.4},
    ...(isDashboard 
      ? [{field: "created_at", headerName: "Created At", flex: 0.5},
      ]
      : [
        {
      field: "",
      headerName: "Email",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
         <div className="flex pt-4">
                     <a href={`mailto:${params.row.email}`}>
                       <AiOutlineMail className="dark:text-white text-black" size={20} />
                     </a>
                   </div>
        );
      },
    }
  ]),
  ];



  const rows : any = [
    {
      id: "123456789",
      userName: "John Doe",
      userEmail: "2CtX5@example.com",
      title: "React",
      price: "$100",
      created_at: "1 day ago",
    }           
  ]


  const rows2 = orderData.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: format(item.createdAt),
  }));
  
  
  
  return (
    <div className={!isDashboard ? "mt-[80px]" : "mt-[0px]"}>
      {
        isLoading ? (
          <Loader/>
        ) : (
          <Box m={isDashboard ? "0" : "40px"}>
            <Box
             m="40px 0 0 0"
            height="calc(100vh - 200px)"
            width="100%"
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: theme === "dark" 
                ? "1px solid #fff!important" 
                : "1px solid #000!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A5A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#000" : "#000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A5A9FC",
              borderTop: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#fff !important`,
            },
            }}
            >
            <DataGrid
            checkboxSelection={isDashboard ? false : true}
            rows={rows}
            columns={columns}
            components={isDashboard ? {} : {Toolbar: GridToolbar}}
            />
          </Box>
          </Box>
        )
      }
    </div>
  )
}

export default AllInvoices