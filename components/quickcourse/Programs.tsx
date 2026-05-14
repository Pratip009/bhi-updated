// components/Programs.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import ProgramsCard from './ProgramsCard'

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

const Programs = () => {
  const [programs, setPrograms] = useState<QuickProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrograms()
  }, [])

  async function fetchPrograms() {
    try {
      const { data, error } = await supabase
        .from('quick_programs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6) // Limit to 6 programs for the homepage
      
      if (error) throw error
      setPrograms(data || [])
    } catch (err: any) {
      console.error('Error fetching programs:', err)
      setError(err.message)
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
        <h1 className='text-4xl md:text-5xl text-gray-900 font-bold'>Popular Programs</h1>
        
        {/* Loading State */}
        {loading && (
          <div className="md:mt-16 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="md:mt-16 mt-10 p-6 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-600">Error loading programs: {error}</p>
          </div>
        )}

        {/* Programs Grid */}
        {!loading && !error && programs.length > 0 && (
          <div className="md:mt-16 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {programs.map((course) => (
              <div key={course.id}>
                <ProgramsCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && programs.length === 0 && (
          <div className="md:mt-16 mt-10 text-center py-12">
            <p className="text-gray-600 text-lg">No programs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Programs