// components/Article.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import ArticleCard from './ArticleCard'
import { Loader2 } from 'lucide-react'

interface Blog {
  id: number
  user_image: string
  username: string
  title: string
  long_description: string
  reaction: number
  cover_image: string
  created_at: string
}

const Article = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLatestBlogs()
  }, [])

  async function fetchLatestBlogs() {
    try {
      // Fetch latest 6 blogs
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6) // Show only 6 latest articles
      
      if (error) throw error
      setBlogs(data || [])
    } catch (err: any) {
      console.error('Error fetching blogs:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to strip HTML tags and get plain text excerpt (5-10 words)
  function getPlainTextExcerpt(html: string): string {
    if (typeof window === 'undefined') return ''
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    const words = text.trim().split(/\s+/)
    const wordCount = Math.min(Math.max(words.length, 5), 10) // Between 5-10 words
    return words.slice(0, wordCount).join(' ') + '...'
  }

  // Helper function to calculate read time
  function calculateReadTime(html: string): string {
    if (typeof window === 'undefined') return '5 min read'
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    const wordsPerMinute = 200
    const wordCount = text.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  // Helper function to format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Helper function to create slug from title
  function createSlug(title: string, id: number): string {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')}-${id}`
  }

  // Transform blog data to match ArticleCard props
  const articles = blogs.map(blog => ({
    id: blog.id,
    userImage: blog.user_image || '/images/default-avatar.jpg',
    username: blog.username,
    reaction: blog.reaction,
    coverImage: blog.cover_image || '/images/default-blog.jpg',
    title: blog.title,
    excerpt: getPlainTextExcerpt(blog.long_description),
    date: formatDate(blog.created_at),
    readTime: calculateReadTime(blog.long_description),
    slug: createSlug(blog.title, blog.id)
  }))

  return (
    <div className='pt-20 pb-20 bg-gray-100'>
      <div className="w-[80%] mx-auto">
        <h1 className='text-4xl md:text-5xl text-gray-900 font-bold'>Latest Articles</h1>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-lime-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">Error loading articles</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchLatestBlogs}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="mt-10 bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-600 text-lg">No articles available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Article