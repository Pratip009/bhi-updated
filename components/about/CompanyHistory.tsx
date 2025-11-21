/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Tilt from 'react-parallax-tilt'
import { MdOutlineAutoGraph } from "react-icons/md";


const CompanyHistory = () => {
    return (
        <div className='pt-16 pb-16 bg-gray-100'>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 items-center gap-12 w-[85%] mx-auto">
                <div className="flex justify-center items-center w-full">
                    <Tilt className="w-full flex justify-center items-center">
                        <Image
                            src="/images/about.jpg"
                            alt="About Image"
                            width={1000}
                            height={1000}
                            className="mx-auto max-w-full h-auto rounded-3xl"
                        />
                    </Tilt>
                </div>
                <div>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
                            <MdOutlineAutoGraph className='h-6 w-6 text-white' />
                        </div>
                        <h1 className='text-xl font-semibold text-black'>About us</h1>
                    </div>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-gray-800 '>
                        Bright Horizon Institute – Your Career Starts Here</h1>
                    <p className='mt-4 text-gray-600 leading-relaxed'>
                        Bright Horizon Institute is a trusted career-training school in Jersey City, helping students build real skills for real careers since 2010.
                        We provide hands-on training, flexible learning options, and nationally recognized certifications designed to prepare you for today’s job market.
                        With strong employer partnerships and dedicated support from enrollment to job placement, we guide you every step of the way.
                    </p>


                    <button className='flex items-center space-x-2 px-8 py-3 mt-8 hover:bg-gray-700 transition-all duration-200 rounded-3xl bg-black text-white'>
                        <span>Learn More</span>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CompanyHistory