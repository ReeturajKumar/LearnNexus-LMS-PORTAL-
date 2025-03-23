import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: {
    avatar: string;
    name: string;
    profession: string;
    company?: string;
    comment: string;
    rating: number;
  };
};

const ReviewsCard = ({ item }: Props) => {
  return (
    <div className="border border-gray-700 rounded-lg p-5 shadow-md w-full min-h-[180px]">
      {/* Header - Avatar, Name, Profession */}
      <div className="flex items-center gap-4">
        <Image
          src={item.avatar}
          width={50}
          height={50}
          className="rounded-full object-cover border border-gray-500"
          alt={item.name}
        />
        <div className="flex-1">
          <h5 className="dark:text-white text-black font-semibold text-lg">{item.name}</h5>
          <p className="dark:text-white text-black text-sm">{item.profession} {item.company && ` | ${item.company}`}</p>
        </div>
      </div>

      {/* Review Content */}
      <p className="mt-4 dark:text-white text-black text-sm leading-relaxed">
        {item.comment}
      </p>

      {/* Rating - Aligned Right */}
      <div className="mt-4 flex justify-end">
        <Ratings rating={item.rating} />
      </div>
    </div>
  );
};

export default ReviewsCard;
