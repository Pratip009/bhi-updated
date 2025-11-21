"use client";

import React, { useState } from "react";
import CourseSection from "./CourseSection";



const Courses = () => {



    return (
        <>
            {/* HERO SECTION */}
            <div className="w-full bg-violet-600 py-24 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Courses</h1>
                <p className="text-lg md:text-xl opacity-70 w-[90%] md:w-2/3 mx-auto">
                    Build real-world skills and stay ahead in today’s fast-changing tech world with our top-rated, expert-led courses.
                </p>
            </div>
            <div className="bg-gray-200">
                <CourseSection />
            </div>


        </>
    );
};

export default Courses;
