'use client'

import Image from 'next/image';
import React from 'react'
import { FaFile, FaStar } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { GiSandsOfTime } from 'react-icons/gi';
import { IoIosTimer } from 'react-icons/io';
import Tilt from 'react-parallax-tilt';
type Props = {
    course: {
        id: number;
        image: string;
        title: string;
        price: number;
        teacher: string;
        reviewNumber: number;
        weeks: number;        // number of weeks
        hours: number;        // total course hours
        category: string;
        preRequisite: string;
        certification: string;
        description: string;
    }
}

const CourseCard = ({ course }: Props) => {
    return (
        <Tilt>
            <div className="bg-white rounded-lg overflow-hidden cursor-pointer">
                <div>
                    <Image src={course.image} alt={course.title} width={400} height={400} className='w-full h-full' />
                </div>
                <div className="p-4">
                    <h1 className='ml-auto relative z-[10] h-20 w-20 flex items-center justify-center flex-col 
    mt-[-4rem] rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 
    text-white font-bold text-lg shadow-md'>
                        ${course.price}
                    </h1>

                    <div className="flex items-center mt-6 space-x-4">
                        <span className='text-lg text-black text-opacity-70 font-bold'>{course.category}</span>
                        <span className='text-base text-gray-600'>{course.teacher}</span>
                    </div>
                    <h1 className='text-xl text-black font-bold mt-2'>{course.title}</h1>
                    <div className="flex mt-2 items-center space-x-2">
                        <div className="flex items-center">
                            <FaStar className='w-4 h-4 text-yellow-600' />
                            <FaStar className='w-4 h-4 text-yellow-600' />
                            <FaStar className='w-4 h-4 text-yellow-600' />
                            <FaStar className='w-4 h-4 text-yellow-600' />
                            <FaStar className='w-4 h-4 text-yellow-600' />
                        </div>
                        <span className='text-base text-orange-800 font-semibold'>({course.reviewNumber} reviews)</span>
                    </div>
                    <div className='mt-6 mb-6 w-full h-[2px] bg-gray-500 opacity-15'></div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <GiSandsOfTime className='w-4 h-4 text-orange-600' />
                            <p className='text-base font-semibold text-gray-800'>{course.weeks} Weeks</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <IoIosTimer className='w-4 h-4 text-orange-600' />
                            <p className='text-base font-semibold text-gray-800'>{course.hours} Hours</p>
                        </div>
                    </div>
                </div>

            </div>
        </Tilt>
    )
}

export default CourseCard