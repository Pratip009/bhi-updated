import React from 'react'
import SupportCards from './SupportCards'

const AppointmentList = () => {
    return (
        <>
        <div className="pt-16 pb-8 flex justify-center">
            <div className="w-[80%] text-center flex flex-col items-center justify-center">

                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold 
                       md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-gray-800'>
                    Student Contact & Appointment Guide
                </h1>

                <p className='mt-4 text-gray-600 max-w-3xl'>
                    To make sure your questions, concerns, and appointments are handled in
                    the best way possible, please follow the contact instructions below.
                    Using the correct contact method will help us respond quickly and efficiently.
                </p>

            </div>

            
        </div>
        <div className="">
            <SupportCards />
        </div>
        </>

    )
}

export default AppointmentList