"use client";

import React from 'react';
import { useRouter } from "next/navigation";
const HeroContent = () => {
  const router = useRouter();
  return (
    <div className="text-center lg:text-left">
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white'>
        Vocational Training Designed for Real-World Careers 
      </h1>

      <p className='mt-6 text-sm md:text-base text-white text-opacity-60'>
        Bright Horizon Institute provides career-focused vocational training in healthcare, IT, hospitality, and technical programs designed to prepare students for today’s workforce.
      </p>

      <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 mt-8">
        <button onClick={() => router.push("/contact")} className='button__cls bg-green-700 hover:bg-green-900'>Get Started</button>
        
      </div>

      

    </div>
  );
};

export default HeroContent;
