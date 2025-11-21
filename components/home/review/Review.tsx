/* eslint-disable react/no-unescaped-entities */
import Slider from '@/components/helper/Slider'
import React from 'react'
import { BsQuote } from 'react-icons/bs'

const Review = () => {
    return (
        <div className='pt-20 pb-16 bg-black'>
            
            <div className="w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-3 items-center gap-20">
                <div className="xl:col-span-1 mt-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
                            <BsQuote className='h-6 w-6 text-white' />
                        </div>
                        <h1 className='text-xl font-semibold text-white'>Students feedback</h1>
                    </div>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.3rem] xl:leading-[3.6rem] text-white'>Trusted by genius people.</h1>
                    <p className='text-base text-white text-opacity-50 mt-8'>See why students and professionals rely on us for skill development and career growth.</p>
                    <div className='flex items-center space-x-10 mt-8'>
                        <p className='text-white font-bold text-5xl'>99%</p>
                        <p className='text-white'>Student's Completed <br /> Course Successfully</p>
                    </div>
                </div>
                <div className="xl:col-span-2 bg-black rounded-lg overflow-hidden">
                    <Slider />
                </div>
            </div>
        </div>
    )
}

export default Review