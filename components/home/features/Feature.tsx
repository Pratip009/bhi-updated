'use client'

import Image from 'next/image'
import React from 'react'
import { FaBriefcase } from 'react-icons/fa'
import Tilt from 'react-parallax-tilt'


const Feature = () => {
    return (
        <div className='pt-16 pb-16'>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 items-center gap-12 w-[85%] mx-auto">
                <div className="flex justify-center items-center w-full">
                    <Tilt className="w-full flex justify-center items-center">
                        <Image
                            src="/images/f.png"
                            alt="Feature Image"
                            width={1000}
                            height={1000}
                            className="mx-auto max-w-full h-auto"
                        />
                    </Tilt>
                </div>


                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
                            <FaBriefcase className='h-6 w-6 text-white' />
                        </div>
                        <h1 className='text-xl font-semibold text-black'>Premium learning experience</h1>
                    </div>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-gray-800'>Collaborate remotely, with
                        Bright Horizon Institute.</h1>
                    <div className='mt-8 mb-6'>
                        <h1 className='text-lg md:text-2xl text-black text-opacity-70 font-semibold'>Master the skills that matter to you</h1>
                        <p className='text-sm md:text-base text-black text-opacity-70 mt-4'>At Bright Horizon Institute, you gain practical, job-ready expertise through guided training and real-world projects. Learn at your own pace while staying connected to expert instructors and a supportive community.</p>
                    </div>
                    <div className='mt-8 mb-6'>
                        <h1 className='text-lg md:text-2xl text-black text-opacity-70 font-semibold'>Build Skills That Lead to Real Job Opportunities</h1>
                        <p className='text-sm md:text-base text-black text-opacity-70 mt-4'>At Bright Horizon Institute, every skill you learn is matched to in-demand career paths and employer expectations. Gain hands-on, job-ready expertise that helps you stand out in the hiring process and launch your career with confidence.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature