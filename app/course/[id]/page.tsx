// app/course/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { FaStar, FaUserGraduate, FaCertificate, FaBook, FaCheckCircle, FaPlay, FaDownload, FaMobile, FaInfinity } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { IoIosTimer } from 'react-icons/io'
import { MdCategory, MdLanguage } from 'react-icons/md'
import { HiAcademicCap } from 'react-icons/hi'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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

interface Review {
    id: number
    course_id: number
    user_name: string
    user_email: string
    rating: number
    review_text: string
    created_at: string
    admin_reply?: string
    admin_reply_date?: string
}

export default function CourseDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [reviews, setReviews] = useState<Review[]>([])
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [newReview, setNewReview] = useState({
        name: '',
        email: '',
        rating: 5,
        text: ''
    })
    const [adminReply, setAdminReply] = useState<{ reviewId: number, text: string } | null>(null)

    useEffect(() => {
        if (params.id) {
            fetchCourse(params.id as string)
            fetchReviews(params.id as string)
        }
        checkUser()
    }, [params.id])

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.user_metadata?.role === 'admin') {
            setIsAdmin(true)
        }
    }

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

    async function fetchReviews(courseId: string) {
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('course_id', courseId)
                .order('created_at', { ascending: false })

            if (error) throw error
            setReviews(data || [])
        } catch (err: any) {
            console.error('Error fetching reviews:', err)
        }
    }

    const handleSubmitReview = async () => {
        if (!course || !newReview.name || !newReview.email || !newReview.text) {
            alert('Please fill in all fields')
            return
        }

        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    {
                        course_id: course.id,
                        user_name: newReview.name,
                        user_email: newReview.email,
                        rating: newReview.rating,
                        review_text: newReview.text
                    }
                ])
                .select()

            if (error) throw error

            setReviews([data[0], ...reviews])
            setShowReviewModal(false)
            setNewReview({ name: '', email: '', rating: 5, text: '' })
            alert('Review submitted successfully!')
        } catch (err: any) {
            console.error('Error submitting review:', err)
            alert('Failed to submit review')
        }
    }

    const handleAdminReply = async (reviewId: number) => {
        if (!adminReply || !adminReply.text) {
            alert('Please enter a reply')
            return
        }

        try {
            const { error } = await supabase
                .from('reviews')
                .update({
                    admin_reply: adminReply.text,
                    admin_reply_date: new Date().toISOString()
                })
                .eq('id', reviewId)

            if (error) throw error

            // Update local state
            setReviews(reviews.map(review =>
                review.id === reviewId
                    ? { ...review, admin_reply: adminReply.text, admin_reply_date: new Date().toISOString() }
                    : review
            ))
            setAdminReply(null)
            alert('Reply posted successfully!')
        } catch (err: any) {
            console.error('Error posting reply:', err)
            alert('Failed to post reply')
        }
    }

    const calculateAverageRating = (): string => {
        if (reviews.length === 0) return '0.0'
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
        return (sum / reviews.length).toFixed(1)
    }

    const handleEnrollClick = () => {
        setShowEmailModal(true)
    }

    const handlePayment = async () => {
        if (!course || !userEmail) {
            alert('Please enter your email address')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(userEmail)) {
            alert('Please enter a valid email address')
            return
        }

        try {
            setPaymentLoading(true)

            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: course.id,
                    courseTitle: course.title,
                    price: course.price,
                    userEmail: userEmail,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session')
            }

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error('No checkout URL received')
            }
        } catch (err: any) {
            console.error('Payment error:', err)
            alert(err.message || 'Payment failed. Please try again.')
        } finally {
            setPaymentLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-black/20 border-t-black rounded-full animate-spin mb-6"></div>
                    <p className="text-neutral-600 text-lg font-medium">Loading course details...</p>
                </div>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-6">😕</div>
                    <h2 className="text-3xl font-bold text-neutral-900 mb-3">Course not found</h2>
                    <p className="text-neutral-600 mb-8 text-base leading-relaxed">{error || 'The course you are looking for does not exist.'}</p>
                    <button
                        onClick={() => router.push('/course')}
                        className="px-8 py-3.5 bg-black text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 font-semibold"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="w-full bg-[#303079] py-24 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>

            </div>
            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative border border-neutral-200">
                        <button
                            onClick={() => setShowEmailModal(false)}
                            className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 text-2xl transition-colors"
                        >
                            ×
                        </button>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                            Complete Your Enrollment
                        </h3>
                        <p className="text-neutral-600 mb-8 text-sm">
                            Enter your email to proceed with the payment
                        </p>
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-4 py-3.5 border border-neutral-300 rounded-lg focus:border-black focus:outline-none focus:ring-1 focus:ring-black mb-6 text-sm transition-all"
                            disabled={paymentLoading}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="flex-1 py-3.5 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all duration-200"
                                disabled={paymentLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={paymentLoading}
                                className="flex-1 py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                            >
                                {paymentLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative border border-neutral-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowReviewModal(false)}
                            className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 text-2xl transition-colors"
                        >
                            ×
                        </button>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                            Write a Review
                        </h3>
                        <p className="text-neutral-600 mb-6 text-sm">
                            Share your experience with this course
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={newReview.email}
                                    onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                                    Rating
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <FaStar
                                                className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-500' : 'text-neutral-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-900 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    placeholder="Share your thoughts about this course..."
                                    value={newReview.text}
                                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm transition-all resize-none"
                                    rows={5}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="flex-1 py-3.5 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="flex-1 py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-200"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-600">
                        <button onClick={() => router.push('/')} className="hover:text-black transition-colors font-medium">Home</button>
                        <span className="text-neutral-400">/</span>
                        <button onClick={() => router.push('/course')} className="hover:text-black transition-colors font-medium">Courses</button>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-900 font-semibold truncate">{course.title}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Course Image */}
                        <div className="order-2 lg:order-1">
                            <div className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-xl">
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
                        <div className="order-1 lg:order-2">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-2 border border-neutral-900 text-neutral-900 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    {course.category}
                                </span>
                                {/* <div className="flex items-center border border-neutral-200 px-3 py-2 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                                    ))}
                                    <span className="ml-2 text-neutral-900 font-semibold text-sm">({course.reviewNumber})</span>
                                </div> */}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-neutral-700 mb-8">
                                <div className="flex items-center space-x-2">
                                    <FaUserGraduate className="text-neutral-900 text-lg" />
                                    <span className="font-medium">{course.teacher}</span>
                                </div>
                                <span className="text-neutral-300">•</span>
                                <div className="flex items-center space-x-2">
                                    <HiAcademicCap className="text-neutral-900 text-lg" />
                                    <span>{course.reviewNumber}+ Students</span>
                                </div>
                            </div>

                            <p className="text-neutral-600 text-lg leading-relaxed">
                                {course.description.substring(0, 220)}...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-900 transition-all duration-200">
                                <GiSandsOfTime className="w-8 h-8 text-neutral-900 mb-4" />
                                <p className="text-3xl font-bold text-neutral-900 mb-1">{course.weeks}</p>
                                <p className="text-neutral-600 text-sm font-medium tracking-wide uppercase">Weeks</p>
                            </div>
                            <div className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-900 transition-all duration-200">
                                <IoIosTimer className="w-8 h-8 text-neutral-900 mb-4" />
                                <p className="text-3xl font-bold text-neutral-900 mb-1">{course.hours}</p>
                                <p className="text-neutral-600 text-sm font-medium tracking-wide uppercase">Hours</p>
                            </div>
                            <div className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-900 transition-all duration-200">
                                <MdLanguage className="w-8 h-8 text-neutral-900 mb-4" />
                                <p className="text-3xl font-bold text-neutral-900 mb-1">EN</p>
                                <p className="text-neutral-600 text-sm font-medium tracking-wide uppercase">Language</p>
                            </div>
                            <div className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-900 transition-all duration-200">
                                <HiAcademicCap className="w-8 h-8 text-neutral-900 mb-4" />
                                <p className="text-3xl font-bold text-neutral-900 mb-1">All</p>
                                <p className="text-neutral-600 text-sm font-medium tracking-wide uppercase">Levels</p>
                            </div>
                        </div>

                        {/* Enrollment Card - Mobile Only */}
                        <div className="lg:hidden border border-neutral-200 rounded-xl p-8">
                            {/* Price */}
                            <div className="text-center mb-8 pb-8 border-b border-neutral-200">
                                <div className="mb-3">
                                    <span className="text-neutral-400 text-lg line-through mr-3">
                                        ${(course.price * 1.5).toFixed(0)}
                                    </span>
                                    <span className="inline-block px-3 py-1.5 border border-emerald-600 text-emerald-700 rounded-full text-xs font-bold tracking-wide uppercase">
                                        Save 33%
                                    </span>
                                </div>
                                <div className="text-5xl font-bold text-neutral-900 mb-2 tracking-tight">
                                    ${course.price}
                                </div>
                                <p className="text-neutral-600 font-medium">One-time payment</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleEnrollClick}
                                    disabled={paymentLoading}
                                    className="w-full py-4 bg-black text-white font-semibold text-lg rounded-xl hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                                >
                                    {paymentLoading ? 'Processing...' : 'Enroll Now'}
                                </button>
                            </div>
                        </div>

                        {/* Course Description */}
                        <div className="border-t border-neutral-200 pt-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                                About This Course
                            </h2>
                            <p className="text-neutral-700 leading-relaxed text-lg">
                                {course.description}
                            </p>
                        </div>

                        {/* What You'll Learn */}
                        <div className="border-t border-neutral-200 pt-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
                                What You&apos;ll Master
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-neutral-200 hover:border-neutral-900 transition-all duration-200">
                                        <FaCheckCircle className="w-5 h-5 text-neutral-900 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prerequisites */}
                        {course.preRequisite && (
                            <div className="border-t border-neutral-200 pt-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
                                    Prerequisites
                                </h2>
                                <p className="text-neutral-700 leading-relaxed text-lg">
                                    {course.preRequisite}
                                </p>
                            </div>
                        )}

                        {/* Certification */}
                        <div className="border-t border-neutral-200 pt-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 tracking-tight">
                                Certification
                            </h2>
                            <div className="flex items-start space-x-6 p-8 rounded-xl border border-neutral-200">
                                <div className="border border-neutral-900 p-4 rounded-xl flex-shrink-0">
                                    <FaCertificate className="w-8 h-8 text-neutral-900" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                        {course.certification || 'Certificate of Completion'}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed">
                                        Upon successful completion of this course, you will receive an industry-recognized certificate that validates your skills and knowledge.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="border-t border-neutral-200 pt-12">
                            <div className="flex items-center justify-between mb-8">
                                {/* <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
                                        Student Reviews
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(parseFloat(calculateAverageRating())) ? 'text-yellow-500' : 'text-neutral-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-lg font-semibold text-neutral-900">
                                            {calculateAverageRating()} out of 5
                                        </span>
                                        <span className="text-neutral-600">({reviews.length} reviews)</span>
                                    </div>
                                </div> */}
                                {/* <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="px-6 py-3 border-2 border-neutral-900 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-900 hover:text-white transition-all duration-200"
                                >
                                    Write a Review
                                </button> */}
                            </div>

                            {/* Reviews List */}
                            {/* <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12 border border-neutral-200 rounded-xl">
                                        <p className="text-neutral-600 text-lg">No reviews yet. Be the first to review this course!</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review.id} className="border border-neutral-200 rounded-xl p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h4 className="font-bold text-neutral-900 text-lg">{review.user_name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <FaStar
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-neutral-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-neutral-600">
                                                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                {isAdmin && !review.admin_reply && (
                                                    <button
                                                        onClick={() => setAdminReply({ reviewId: review.id, text: '' })}
                                                        className="px-4 py-2 text-sm border border-neutral-900 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-900 hover:text-white transition-all duration-200"
                                                    >
                                                        Reply
                                                    </button>
                                                )}
                                            </div>

                                            <p className="text-neutral-700 leading-relaxed mb-4">
                                                {review.review_text}
                                            </p>

                                            {/* Admin Reply */}
                                            {/* {review.admin_reply && (
                                                <div className="mt-4 ml-6 pl-6 border-l-2 border-neutral-300">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                                            Admin
                                                        </span>
                                                        <span className="text-sm text-neutral-600">
                                                            {new Date(review.admin_reply_date || '').toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-neutral-700 leading-relaxed">
                                                        {review.admin_reply}
                                                    </p>
                                                </div>
                                            )} */}

                                            {/* Admin Reply Form */}
                                            {/* {isAdmin && adminReply?.reviewId === review.id && (
                                                <div className="mt-4 ml-6 pl-6 border-l-2 border-neutral-900">
                                                    <textarea
                                                        value={adminReply.text}
                                                        onChange={(e) => setAdminReply({ ...adminReply, text: e.target.value })}
                                                        placeholder="Write your reply..."
                                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 mb-3 text-sm resize-none"
                                                        rows={3}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleAdminReply(review.id)}
                                                            className="px-4 py-2 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-200 text-sm"
                                                        >
                                                            Post Reply
                                                        </button>
                                                        <button
                                                            onClick={() => setAdminReply(null)}
                                                            className="px-4 py-2 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all duration-200 text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )} */}
                                        {/* </div>
                                    ))
                                )}
                            </div> */}
                        </div>
                    </div>

                    {/* Right Column - Enrollment Card (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="border border-neutral-200 rounded-xl p-8 sticky top-24">

                            {/* Price */}
                            <div className="text-center mb-8 pb-8 border-b border-neutral-200">
                                <div className="mb-3">
                                    <span className="text-neutral-400 text-xl line-through mr-3">
                                        ${(course.price * 1.5).toFixed(0)}
                                    </span>
                                    <span className="inline-block px-3 py-1.5 border border-emerald-600 text-emerald-700 rounded-full text-xs font-bold tracking-wide uppercase">
                                        Save 33%
                                    </span>
                                </div>
                                <div className="text-6xl font-bold text-neutral-900 mb-2 tracking-tight">
                                    ${course.price}
                                </div>
                                <p className="text-neutral-600 font-medium">One-time payment</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-4 mb-8">
                                <button
                                    onClick={handleEnrollClick}
                                    disabled={paymentLoading}
                                    className="w-full py-4 bg-black text-white font-semibold text-lg rounded-xl hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                                >
                                    {paymentLoading ? 'Processing...' : 'Enroll Now'}
                                </button>
                            </div>

                            {/* Course Includes */}
                            <div className="space-y-5 mb-8 pb-8 border-b border-neutral-200">
                                <h3 className="font-bold text-neutral-900 text-sm tracking-wide uppercase mb-5">This course includes:</h3>

                                <div className="flex items-center space-x-3 text-neutral-700">
                                    <div className="border border-neutral-900 p-2 rounded-lg">
                                        <FaPlay className="text-neutral-900 w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm">{course.hours} hours on-demand video</span>
                                </div>

                                <div className="flex items-center space-x-3 text-neutral-700">
                                    <div className="border border-neutral-900 p-2 rounded-lg">
                                        <FaDownload className="text-neutral-900 w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm">Downloadable resources</span>
                                </div>

                                <div className="flex items-center space-x-3 text-neutral-700">
                                    <div className="border border-neutral-900 p-2 rounded-lg">
                                        <FaInfinity className="text-neutral-900 w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm">Lifetime access</span>
                                </div>

                                <div className="flex items-center space-x-3 text-neutral-700">
                                    <div className="border border-neutral-900 p-2 rounded-lg">
                                        <FaCertificate className="text-neutral-900 w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm">Certificate of completion</span>
                                </div>
                            </div>

                            {/* Guarantee */}
                            {/* <div className="text-center">
                                <div className="inline-block border border-emerald-600 px-6 py-3 rounded-lg">
                                    <p className="text-emerald-700 font-bold text-sm">
                                        ✓ 30-Day Money-Back Guarantee
                                    </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 shadow-xl z-50">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-neutral-400 line-through font-medium">${(course.price * 1.5).toFixed(0)}</p>
                        <p className="text-2xl font-bold text-neutral-900 tracking-tight">${course.price}</p>
                    </div>
                    <button
                        onClick={handleEnrollClick}
                        disabled={paymentLoading}
                        className="flex-1 py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-200 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                    >
                        {paymentLoading ? 'Processing...' : 'Enroll Now'}
                    </button>
                </div>
            </div>

            {/* Add padding bottom for mobile sticky bar */}
            <div className="lg:hidden h-20"></div>
        </div>
    )
}