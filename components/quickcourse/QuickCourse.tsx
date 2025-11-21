import React from 'react'
import Programs from './Programs'

const QuickCourse = () => {
    return (
       <>
        <div className="w-full bg-yellow-600 py-24 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Quick Programs</h1>
            <p className="text-lg md:text-xl opacity-70 w-[90%] md:w-2/3 mx-auto">
                Build real-world skills and stay ahead in today’s fast-changing tech world with our top-rated, expert-led quick programs.
            </p>
        </div>
       <div className="">
        <Programs />
       </div>
       </>

    )
}

export default QuickCourse