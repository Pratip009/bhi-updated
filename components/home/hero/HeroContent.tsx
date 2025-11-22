"use client";

import React from 'react';
import { useRouter } from "next/navigation";
const HeroContent = () => {
  const router = useRouter();
  return (
    <div className="text-center lg:text-left">
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white'>
        Best vocational institute at New Jersey.
      </h1>

      <p className='mt-6 text-sm md:text-base text-white text-opacity-60'>
        Bright Horizon Institute offers accredited vocational training in healthcare, IT, hospitality, and technical fields, preparing New Jersey students for job-ready careers.
      </p>

      <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 mt-8">
        <button onClick={() => router.push("/course")} className='button__cls bg-green-700 hover:bg-green-900'>Get Started</button>
        <button onClick={() => router.push("/about")} className='button__cls bg-yellow-700 hover:bg-yellow-900'>Learn More</button>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 mt-8">
        <div className="flex flex-col items-center">
          <p className='md:text-xl lg:text-2xl text-base text-white font-bold'>10+</p>
          <p className='w-[100px] h-[3px] bg-green-600 mt-2 mb-2 rounded-lg'></p>
          <p className='md:text-lg text-sm text-white text-opacity-70'>Tutors</p>
        </div>
        <div className="flex flex-col items-center">
          <p className='md:text-xl lg:text-2xl text-base text-white font-bold'>100+</p>
          <p className='w-[100px] h-[3px] bg-blue-600 mt-2 mb-2 rounded-lg'></p>
          <p className='md:text-lg text-sm text-white text-opacity-70'>Students</p>
        </div>
        <div className="flex flex-col items-center">
          <p className='md:text-xl lg:text-2xl text-base text-white font-bold'>20+</p>
          <p className='w-[100px] h-[3px] bg-pink-600 mt-2 mb-2 rounded-lg'></p>
          <p className='md:text-lg text-sm text-white text-opacity-70'>Courses</p>
        </div>
      </div>

    </div>
  );
};

export default HeroContent;
