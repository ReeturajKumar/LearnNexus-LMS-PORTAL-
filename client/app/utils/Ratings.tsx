import React, { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfStroke } from "react-icons/fa6";


type Props = {
  rating: number
}

const Ratings:FC<Props> = ({rating}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar key={i} 
        className="text-yellow-500 mr-2 cursor-pointer"
        size={20}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <FaStarHalfStroke key={i} 
        className="text-yellow-500 mr-2 cursor-pointer"
        size={27}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar key={i} 
        className="text-gray-300 mr-2 cursor-pointer"
        size={20}
        />
      );
    }
  }
  return (
    <div className='flex mt-1 ml-2 md:mt-0 md:ml-0'>{stars}</div>
  )
}

export default Ratings