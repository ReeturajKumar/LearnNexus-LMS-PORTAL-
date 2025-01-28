import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarDefault from "../../../public/assets/avatar.webp";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styless/style";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadeUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name);
  const [localAvatar, setLocalAvatar] = useState(user?.avatar?.url || avatar);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const { data: userData, refetch } = useLoadeUserQuery(undefined);

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const newAvatar = fileReader.result;
        setLocalAvatar(newAvatar); // Update local state for instant UI change
        updateAvatar(newAvatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch(); // Fetch updated user data
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error, refetch]);

  useEffect(() => {
    if (userData?.user) {
      setLocalAvatar(userData.user.avatar?.url || avatarDefault);
    }
  }, [userData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={localAvatar}
            alt="Avatar"
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full object-cover cursor-pointer border-[#37a39a] border-4"
          />
          <input
            type="file"
            onChange={imageHandler}
            className="hidden"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex justify-center items-center cursor-pointer">
              <AiOutlineCamera className="z-1" size={20} />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-1"> Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] ">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                value={user?.email}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                disabled
              />
            </div>
            <input
              type="submit"
              value="Update"
              required
              className={`w-full md:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8  font-Poppins cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
