/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, MenuItem, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Image from "next/image";
import Link from "next/link";
import React, { FC, JSX, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
  theme: string;
}

const Item: FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  theme,
}) => {
  return (
    <MenuItem
      className={`flex items-center px-4 py-2 rounded-md 
        ${
          selected === title
            ? theme === "dark"
              ? "bg-[#1E293B] text-white"
              : "bg-gray-200 text-black"
            : ""
        } 
        ${
          theme === "dark"
            ? "text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800"
            : "text-gray-700 hover:bg-gray-300"
        }`}
      onClick={() => setSelected(title)}
    >
      {icon}
      <Typography className="ml-4 text-[16px] font-poppins">
        {title}
      </Typography>{" "}
      {/* Adjusted ml-3 to ml-4 */}
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      className={`${
        theme === "dark"
          ? "bg-[#0F172A] text-gray-300"
          : "bg-[#F8FAFC] text-black"
      } h-[100vh] w-[18%] fixed p-4 overflow-y-auto`}
    >
      <Box textAlign="center" mt={2}>
        <Typography
          variant="h5"
          className={`text-[20px] font-poppins uppercase ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          LearnNexus
        </Typography>
        <Box mt={2}>
          <Image
            alt="profile-user"
            width={80}
            height={80}
            src={user?.avatar ? user?.avatar.url : "/default-avatar.png"}
            className="cursor-pointer rounded-full border-2 border-blue-500 mx-auto"
          />
        </Box>
        <Typography
          variant="h6"
          className={`text-[18px] font-poppins mt-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {user?.name}
        </Typography>
        <Typography
          variant="body2"
          className={`${
            theme === "dark"
              ? "text-gray-400 capitalize"
              : "text-gray-600 capitalize"
          }`}
        >
          - {user?.role}
        </Typography>
      </Box>

      <Box className="mt-6">
        <Item
          title="Dashboard"
          to="/admin"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Data
        </Typography>
        <Item
          title="Users"
          to="/admin/users"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Invoices"
          to="/admin/invoices"
          icon={<ReceiptOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Content
        </Typography>
        <Item
          title="Create Course"
          to="/admin/create-course"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Live Courses"
          to="/admin/live-courses"
          icon={<LiveTvOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Customization
        </Typography>
        <Item
          title="Hero"
          to="/admin/hero"
          icon={<ViewQuiltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="FAQ"
          to="/admin/faq"
          icon={<QuizOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Categories"
          to="/admin/categories"
          icon={<CategoryOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Controllers
        </Typography>
        <Item
          title="Manage Team"
          to="/admin/manage-team"
          icon={<GroupsOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Analytics
        </Typography>
        <Item
          title="Courses Analytics"
          to="/admin/courses-analytics"
          icon={<BarChartOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Orders Analytics"
          to="/admin/orders-analytics"
          icon={<ShoppingCartOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Users Analytics"
          to="/admin/users-analytics"
          icon={<PersonOutlineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />

        <Typography
          variant="h6"
          className={`mt-4 ml-5 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          Extras
        </Typography>
        <Item
          title="Settings"
          to="/admin/settings"
          icon={<SettingsOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
        <Item
          title="Logout"
          to="/logout"
          icon={<ExitToAppOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          theme={theme}
        />
      </Box>
    </Box>
  );
};

export default AdminSidebar;
