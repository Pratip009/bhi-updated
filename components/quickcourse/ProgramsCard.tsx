'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { GiSandsOfTime } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";

type Props = {
    course: {
        id: number;
        image: string;
        title: string;
        description: string;
        price: number;
        teacher: string;
        reviewNumber: number;
        weeks: number;
        hours: number;
        category: string;
        preRequisite: string;
        certification: string;
    }
}

// Helper: show first 10 words
const shortDescription = (text: string) => {
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
};

const ProgramsCard = ({ course }: Props) => {
  return (
    <Link href={`/quick-programs/${course.id}`}>
      <Tilt>
          {/* FIXED HEIGHT CARD */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer h-[550px] flex flex-col hover:shadow-2xl transition-shadow duration-300">
            
            {/* Image */}
            <div className="w-full h-[220px] overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">

                {/* Price Badge */}
                {/* <h1 className='ml-auto relative z-[10] h-20 w-20 flex items-center 
                               text-lg font-bold justify-center flex-col mt-[-4rem] 
                               rounded-full bg-yellow-600 text-white'>
                    ${course.price}
                </h1> */}

                {/* Category */}
                <div className="flex items-center mt-6">
                    <span className='text-lg text-black text-opacity-70 font-bold'>
                        {course.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className='text-xl text-black font-bold mt-2'>
                    {course.title}
                </h1>

                {/* Short Description */}
                <p className="text-gray-700 mt-1">
                    {shortDescription(course.description)}
                </p>

                {/* Reviews */}
                {/* <div className="flex mt-2 items-center space-x-2">
                    <div className="flex items-center">
                        <FaStar className='w-4 h-4 text-yellow-600' />
                        <FaStar className='w-4 h-4 text-yellow-600' />
                        <FaStar className='w-4 h-4 text-yellow-600' />
                        <FaStar className='w-4 h-4 text-yellow-600' />
                        <FaStar className='w-4 h-4 text-yellow-600' />
                    </div>
                    <span className='text-base text-orange-800 font-semibold'>
                        ({course.reviewNumber} reviews)
                    </span>
                </div> */}

                {/* Divider */}
                <div className='mt-6 mb-6 w-full h-[2px] bg-gray-500 opacity-15'></div>

                {/* Footer (sticks to bottom because of flex-grow above) */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                        <GiSandsOfTime className='w-4 h-4 text-yellow-600' />
                        <p className='text-base font-semibold text-gray-800'>
                            {course.weeks} {course.weeks === 1 ? 'week' : 'weeks'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IoIosTimer className='w-4 h-4 text-yellow-600' />
                        <p className='text-base font-semibold text-gray-800'>
                            {course.hours} {course.hours === 1 ? 'hour' : 'hours'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </Tilt>
    </Link>
  )
}

export default ProgramsCard