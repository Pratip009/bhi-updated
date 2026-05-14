/* eslint-disable react/no-unescaped-entities */
// app/programs/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaStar, 
  FaCheck, 
  FaClock, 
  FaCertificate, 
  FaBook, 
  FaUser,
  FaChevronRight,
  FaPlay,
  FaDownload,
  FaShareAlt,
  FaHeart,
  FaHome
} from 'react-icons/fa'
import { GiSandsOfTime } from "react-icons/gi"
import { IoIosTimer } from "react-icons/io"
import { MdVerified } from "react-icons/md"

interface QuickProgram {
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
  created_at?: string
}

export default function ProgramDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [program, setProgram] = useState<QuickProgram | null>(null)
  const [relatedPrograms, setRelatedPrograms] = useState<QuickProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'instructor'>('overview')

  useEffect(() => {
    if (params.id) {
      fetchProgram(params.id as string)
    }
  }, [params.id])

  async function fetchProgram(id: string) {
    try {
      const { data, error } = await supabase
        .from('quick_programs')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      setProgram(data)
      
      // Fetch related programs from the same category
      if (data) {
        fetchRelatedPrograms(data.category, id)
      }
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchRelatedPrograms(category: string, currentId: string) {
    try {
      const { data, error } = await supabase
        .from('quick_programs')
        .select('*')
        .eq('category', category)
        .neq('id', currentId)
        .limit(3)
      
      if (error) throw error
      setRelatedPrograms(data || [])
    } catch (err: any) {
      console.error('Error fetching related programs:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program not found</h1>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const features = [
    { icon: FaClock, label: 'Duration', value: `${program.weeks} weeks` },
    { icon: IoIosTimer, label: 'Total Hours', value: `${program.hours} hours` },
    { icon: FaCertificate, label: 'Certification', value: program.certification || 'Certificate included' },
    { icon: FaBook, label: 'Prerequisites', value: program.preRequisite || 'None' },
  ]

  const benefits = [
    'Lifetime access to course materials',
    'Certificate of completion',
    'Direct instructor support',
    'Hands-on projects and exercises',
    'Industry-recognized certification',
    'Job placement assistance',
    'Access to exclusive community',
    'Regular updates and new content'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matte Black */}
      <div className="w-full bg-[#303079] py-24 text-center text-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <FaHome className="w-4 h-4" />
              Home
            </Link>
            <FaChevronRight className="w-3 h-3" />
            <Link href="/programs" className="hover:text-white transition-colors">
              Programs
            </Link>
            <FaChevronRight className="w-3 h-3" />
            <span className="text-white">{program.category}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto px-4">
          {program.title}
        </h1>
        <p className="text-lg md:text-xl opacity-60 w-[90%] md:w-2/3 mx-auto">
          Master {program.category} skills with our comprehensive {program.weeks}-week program taught by industry experts
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-300">({program.reviewNumber} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            <span className="text-gray-300">by {program.teacher}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
              {program.category}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - White Background */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Program Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={program.image} 
                alt={program.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-200">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 text-gray-900 mb-3 mx-auto" />
                  <p className="text-gray-500 text-sm mb-1">{feature.label}</p>
                  <p className="text-gray-900 font-bold text-lg">{feature.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                {['overview', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 font-semibold capitalize transition-all relative ${
                      activeTab === tab 
                        ? 'text-gray-900 border-b-2 border-gray-900' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Program</h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {program.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This comprehensive program is designed to provide you with practical, industry-relevant skills 
                    that you can apply immediately. Whether you're starting your career or looking to upskill, 
                    this program offers the perfect blend of theory and hands-on practice.
                  </p>
                </div>

                {/* What You'll Learn */}
                <div className="py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 py-2">
                        <div className="mt-1">
                          <FaCheck className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="py-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <div className="flex items-start gap-3">
                    <FaBook className="w-5 h-5 text-gray-900 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Prerequisites</p>
                      <p className="text-gray-700">{program.preRequisite || 'No prerequisites required. This program is suitable for beginners.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Instructor</h2>
                <div className="py-6 border-t border-b border-gray-200">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        {program.teacher}
                        <MdVerified className="w-6 h-6 text-blue-500" />
                      </h3>
                      <p className="text-gray-600 font-semibold mb-4">Expert {program.category} Instructor</p>
                      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaStar className="text-yellow-500" />
                          <span>4.9 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-600" />
                          <span>10,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaBook className="text-gray-600" />
                          <span>25+ Programs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {program.teacher} is a seasoned professional with over 15 years of experience in the {program.category} industry. 
                    Known for their engaging teaching style and practical approach, they have helped thousands of students 
                    achieve their career goals. Their programs are highly rated for their clarity, depth, and real-world applicability.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-lg p-8 border-2 border-gray-900 sticky top-8">
              <div className="text-center mb-8 pb-8 border-b border-gray-200">
                <p className="text-gray-600 text-sm mb-2 uppercase tracking-wide">Program Price</p>
                <p className="text-6xl font-bold text-gray-900">${program.price}</p>
                <p className="text-sm text-gray-500 mt-2">One-time payment</p>
              </div>
              
              <button className="w-full py-4 bg-gray-900 rounded-lg text-white font-semibold hover:bg-gray-800 transition-all mb-4 text-lg">
                Enroll Now
              </button>
              
              <button className="w-full py-4 bg-white rounded-lg text-gray-900 font-semibold border-2 border-gray-200 hover:border-gray-900 transition-all mb-8 flex items-center justify-center gap-2">
                <FaHeart className="w-4 h-4" />
                Add to Wishlist
              </button>

              <div className="space-y-4 text-sm mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-start gap-3 text-gray-700">
                  <FaCheck className="text-green-600 flex-shrink-0 mt-1" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <FaCheck className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <FaCheck className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <FaCheck className="text-green-600 flex-shrink-0 mt-1" />
                  <span>Mobile and desktop access</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-900 mb-4 font-semibold uppercase tracking-wide">Share this program</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Facebook
                  </button>
                  <button className="flex-1 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                    Twitter
                  </button>
                  <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Programs Section */}
      {relatedPrograms.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">More Programs in {program.category}</h2>
              <p className="text-gray-600">Explore other programs that might interest you</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPrograms.map((relatedProgram) => (
                <Link key={relatedProgram.id} href={`/programs/${relatedProgram.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-900 transition-all hover:shadow-lg group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={relatedProgram.image} 
                        alt={relatedProgram.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-lg">
                        ${relatedProgram.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                          {relatedProgram.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-600">({relatedProgram.reviewNumber})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {relatedProgram.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedProgram.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaClock className="w-4 h-4" />
                          <span>{relatedProgram.weeks} weeks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <IoIosTimer className="w-4 h-4" />
                          <span>{relatedProgram.hours} hours</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaUser className="w-4 h-4" />
                          <span>by {relatedProgram.teacher}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                View All Programs
                <FaChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}