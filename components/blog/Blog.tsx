'use client'

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ArticleCard from "../home/article/ArticleCard";

interface Blog {
  id: number;
  user_image: string;
  username: string;
  title: string;
  long_description: string;
  reaction: number;
  cover_image: string;
  created_at?: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('blogs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchBlogs(); // Refresh data when changes occur
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBlogs(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Helper function to strip HTML tags
  function stripHtml(html: string): string {
    if (typeof window === 'undefined') return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Helper function to format date
  function formatDate(dateString?: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Helper function to calculate read time
  function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const text = stripHtml(content);
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  }

  // Helper function to generate slug
  function generateSlug(title: string, id: number): string {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-${id}`;
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-[#303079] py-32 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Our Blog
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Explore the latest articles, insights, and updates from our expert team.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Latest Articles
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-center">
              <p>Error loading blogs: {error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading articles...</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog) => (
                <ArticleCard 
                  key={blog.id} 
                  article={{
                    id: blog.id,
                    userImage: blog.user_image,
                    username: blog.username,
                    reaction: blog.reaction,
                    coverImage: blog.cover_image,
                    title: blog.title,
                    excerpt: stripHtml(blog.long_description).substring(0, 150) + '...',
                    date: formatDate(blog.created_at),
                    readTime: calculateReadTime(blog.long_description),
                    slug: generateSlug(blog.title, blog.id)
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-4">
                No articles found.
              </p>
              <p className="text-gray-400">
                Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;