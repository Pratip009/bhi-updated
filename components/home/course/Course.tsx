// components/Course.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import React from 'react'
import CourseCard from './CourseCard'

interface Course {
    id: number
    image: string
    title: string
    price: number
    teacher: string
    reviewNumber: number
    weeks: number
    hours: number
    category: string
    preRequisite: string
    certification: string
    description: string
}

const Course = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCourses()
    }, [])

    async function fetchCourses() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(6) 

            if (error) throw error

            setCourses(data || [])
        } catch (err: any) {
            console.error('Error fetching courses:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='pt-16 pb-12 relative bg-gray-200'>
            <Image 
                src="/images/cb.png" 
                alt='Courses' 
                width={800} 
                height={800} 
                className='absolute top-[30%] animate-bounce' 
            />
            <div className="w-[80%] pt-8 pb-8 mx-auto">
                <h1 className='text-4xl md:text-5xl text-gray-900 font-bold'>Popular Courses</h1>
                
                {loading ? (
                    // Loading State
                    <div className="md:mt-16 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="bg-white rounded-lg overflow-hidden animate-pulse">
                                <div className="w-full h-64 bg-gray-300"></div>
                                <div className="p-4">
                                    <div className="h-20 w-20 rounded-full bg-gray-300 ml-auto -mt-16 mb-6"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                                    <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    // Empty State
                    <div className="md:mt-16 mt-10 text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No courses available</h3>
                        <p className="text-gray-600">Check back later for new courses!</p>
                    </div>
                ) : (
                    // Courses Grid
                    <div className="md:mt-16 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                        {courses.map((course) => (
                            <div key={course.id}>
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Course