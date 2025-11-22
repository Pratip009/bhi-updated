// app/course/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { FaStar, FaUserGraduate, FaCertificate, FaBook, FaCheckCircle, FaPlay, FaDownload, FaMobile, FaInfinity } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { IoIosTimer } from 'react-icons/io'
import { MdCategory, MdLanguage } from 'react-icons/md'
import { HiAcademicCap } from 'react-icons/hi'

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

export default function CourseDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (params.id) {
            fetchCourse(params.id as string)
        }
    }, [params.id])

    async function fetchCourse(id: string) {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error

            setCourse(data)
        } catch (err: any) {
            console.error('Error fetching course:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 text-base md:text-lg font-medium text-center">Loading course details...</p>
                </div>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-4xl md:text-6xl mb-4">😕</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Course not found</h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{error || 'The course you are looking for does not exist.'}</p>
                    <button
                        onClick={() => router.push('/course')}
                        className="px-6 md:px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm md:text-base"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="w-full bg-black py-12 md:py-16 lg:py-24 text-center text-white px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:mb-4 leading-tight mt-10">
                    {course.title}
                </h1>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
                        <button onClick={() => router.push('/')} className="hover:text-gray-900 transition-colors whitespace-nowrap">Home</button>
                        <span>/</span>
                        <button onClick={() => router.push('/course')} className="hover:text-gray-900 transition-colors whitespace-nowrap">Courses</button>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold truncate">{course.title}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section with Image */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                        {/* Course Image */}
                        <div className="order-1 lg:order-1">
                            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="order-2 lg:order-2">
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-rose-50 text-rose-600 rounded-full text-xs md:text-sm font-semibold border border-rose-200">
                                    {course.category}
                                </span>
                                <div className="flex items-center bg-gray-50 px-2 md:px-3 py-1.5 md:py-2 rounded-full border border-gray-200">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                                    ))}
                                    <span className="ml-1.5 md:ml-2 text-gray-600 font-medium text-xs md:text-sm">({course.reviewNumber})</span>
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-700 mb-4 md:mb-6">
                                <div className="flex items-center space-x-2">
                                    <FaUserGraduate className="text-gray-500 text-sm md:text-base" />
                                    <span className="font-medium text-sm md:text-base">{course.teacher}</span>
                                </div>
                                <span className="text-gray-400 hidden sm:inline">•</span>
                                <div className="flex items-center space-x-2">
                                    <HiAcademicCap className="text-gray-500 text-sm md:text-base" />
                                    <span className="text-sm md:text-base">{course.reviewNumber}+ Students</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
                                {course.description.substring(0, 200)}...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <GiSandsOfTime className="w-6 h-6 md:w-8 md:h-8 text-rose-600 mb-2 md:mb-3" />
                                <p className="text-xl md:text-2xl font-bold text-gray-900">{course.weeks}</p>
                                <p className="text-gray-600 text-xs md:text-sm">Weeks</p>
                            </div>
                            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <IoIosTimer className="w-6 h-6 md:w-8 md:h-8 text-rose-600 mb-2 md:mb-3" />
                                <p className="text-xl md:text-2xl font-bold text-gray-900">{course.hours}</p>
                                <p className="text-gray-600 text-xs md:text-sm">Hours</p>
                            </div>
                            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <MdLanguage className="w-6 h-6 md:w-8 md:h-8 text-rose-600 mb-2 md:mb-3" />
                                <p className="text-xl md:text-2xl font-bold text-gray-900">EN</p>
                                <p className="text-gray-600 text-xs md:text-sm">Language</p>
                            </div>
                            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <HiAcademicCap className="w-6 h-6 md:w-8 md:h-8 text-rose-600 mb-2 md:mb-3" />
                                <p className="text-xl md:text-2xl font-bold text-gray-900">All</p>
                                <p className="text-gray-600 text-xs md:text-sm">Levels</p>
                            </div>
                        </div>

                        {/* Enrollment Card - Mobile Only */}
                        <div className="lg:hidden bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl shadow-xl p-6">
                            {/* Price */}
                            <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                <div className="mb-2">
                                    <span className="text-gray-500 text-base md:text-lg line-through mr-2">
                                        ${(course.price * 1.5).toFixed(0)}
                                    </span>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-bold">
                                        33% OFF
                                    </span>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    ${course.price}
                                </div>
                                <p className="text-gray-600 font-medium text-sm md:text-base">One-time payment</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full py-3.5 bg-black text-white font-bold text-base md:text-lg rounded-xl hover:bg-gray-900 transition-all shadow-lg">
                                    Enroll Now
                                </button>
                                <button className="w-full py-3.5 border-2 border-black text-black font-bold text-base md:text-lg rounded-xl hover:bg-gray-50 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                                <div className="w-1 h-6 md:h-8 bg-rose-600 rounded-full mr-3 md:mr-4"></div>
                                About This Course
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                                {course.description}
                            </p>
                        </div>

                        {/* What You'll Learn */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                                <div className="w-1 h-6 md:h-8 bg-rose-600 rounded-full mr-3 md:mr-4"></div>
                                What You&apos;ll Master
                            </h2>
                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                                {[
                                    'Master fundamentals and advanced concepts',
                                    'Gain hands-on practical experience',
                                    'Work on real-world industry projects',
                                    'Get industry-recognized certification',
                                    'Learn from experienced professionals',
                                    'Access lifetime course materials',
                                    'Join exclusive community network',
                                    'Receive career guidance and support'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm md:text-base">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prerequisites */}
                        {course.preRequisite && (
                            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                                    <div className="w-1 h-6 md:h-8 bg-rose-600 rounded-full mr-3 md:mr-4"></div>
                                    Prerequisites
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                                    {course.preRequisite}
                                </p>
                            </div>
                        )}

                        {/* Certification */}
                        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                                <div className="w-1 h-6 md:h-8 bg-rose-600 rounded-full mr-3 md:mr-4"></div>
                                Certification
                            </h2>
                            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="bg-rose-50 p-3 md:p-4 rounded-xl flex-shrink-0">
                                    <FaCertificate className="w-6 h-6 md:w-8 md:h-8 text-rose-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                        {course.certification || 'Certificate of Completion'}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        Upon successful completion of this course, you will receive an industry-recognized certificate that validates your skills and knowledge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Enrollment Card (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 sticky top-24">

                            {/* Price */}
                            <div className="text-center mb-8 pb-8 border-b border-gray-200">
                                <div className="mb-3">
                                    <span className="text-gray-500 text-xl line-through mr-2">
                                        ${(course.price * 1.5).toFixed(0)}
                                    </span>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                                        33% OFF
                                    </span>
                                </div>
                                <div className="text-6xl font-bold text-gray-900 mb-2">
                                    ${course.price}
                                </div>
                                <p className="text-gray-600 font-medium">One-time payment</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-4 mb-8">
                                <button className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-900 transform hover:scale-[1.02] transition-all duration-300 shadow-xl">
                                    Enroll Now
                                </button>
                               
                            </div>

                            {/* Course Includes */}
                            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                                <h3 className="font-bold text-gray-900 text-lg mb-4">This course includes:</h3>

                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="bg-black/5 p-2 rounded-lg">
                                        <FaPlay className="text-black w-4 h-4" />
                                    </div>
                                    <span className="font-medium">{course.hours} hours on-demand video</span>
                                </div>

                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="bg-black/5 p-2 rounded-lg">
                                        <FaDownload className="text-black w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Downloadable resources</span>
                                </div>

                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="bg-black/5 p-2 rounded-lg">
                                        <FaInfinity className="text-black w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Lifetime access</span>
                                </div>

                                <div className="flex items-center space-x-3 text-gray-700">
                                    <div className="bg-black/5 p-2 rounded-lg">
                                        <FaCertificate className="text-black w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Certificate of completion</span>
                                </div>
                            </div>

                            {/* Guarantee */}
                            <div className="text-center">
                                <div className="inline-block bg-green-50 px-6 py-3 rounded-xl border border-green-200">
                                    <p className="text-green-800 font-bold text-sm">
                                        ✓ 30-Day Money-Back Guarantee
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500 line-through">${(course.price * 1.5).toFixed(0)}</p>
                        <p className="text-2xl font-bold text-gray-900">${course.price}</p>
                    </div>
                    <button className="flex-1 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
                        Enroll Now
                    </button>
                </div>
            </div>

            {/* Add padding bottom for mobile sticky bar */}
            <div className="lg:hidden h-20"></div>
        </div>
    )
}