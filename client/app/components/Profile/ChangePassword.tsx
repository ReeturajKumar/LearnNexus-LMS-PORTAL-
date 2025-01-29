/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { styles } from "@/app/styless/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="w-full pl-7 px-2 md:px-5 md:pl-0">
      <h1 className="block text-[25px] md:text-[30px] font-poppins text-center font-[500] text-black pb-2 dark:text-white">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={handlePasswordChange}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="w-[100%] md:w-[60%] mt-5">
            <label className="block text-black pb-2 dark:text-white">
              Enter your Old Password
            </label>
            <input
              required
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
          </div>

          <div className="w-[100%] md:w-[60%] mt-2">
            <label className="block text-black pb-2 dark:text-white">
              Enter your Your Password
            </label>
            <input
              required
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
          </div>

          <div className="w-[100%] md:w-[60%] mt-2">
            <label className="block text-black pb-2 dark:text-white">
              Enter your Confirm Password
            </label>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />

            <input
              type="submit"
              value={"Update Password"}
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-white rounded-[3px] mt-8 cursor-pointer`}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
