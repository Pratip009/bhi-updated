import React from 'react'
import AppointmentList from './AppointmentList'
import GuidelinesSection from './GuidelinesSection'
const Appointment = () => {
    return (
        <>
            <div className="w-full bg-sky-600 py-24 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Appointment</h1>
                <p className="text-lg md:text-xl opacity-70 w-[90%] md:w-2/3 mx-auto">
                    Schedule your appointments easily and stay organized with our efficient booking system.
                </p>
            </div>
            <div className="">
                <AppointmentList />
                <GuidelinesSection />
            </div>
        </>
    )
}

export default Appointment