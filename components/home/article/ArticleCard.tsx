// components/ArticleCard.tsx
'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BiHeart } from 'react-icons/bi';
import { Calendar, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type Props = {
  article: {
    id: number;
    userImage: string;
    username: string;
    reaction: number;
    coverImage: string;
    title: string;
    excerpt?: string;
    date?: string;
    readTime?: string;
    slug?: string;
  };
};

const ArticleCard = ({ article }: Props) => {
  const [reactionCount, setReactionCount] = useState(article.reaction)
  const [isLiking, setIsLiking] = useState(false)
  const [hasReacted, setHasReacted] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    checkUserReaction()
  }, [])

  // Get current user and check if they've reacted
  async function checkUserReaction() {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUserId(user.id)
        
        // Check if user has reacted to this blog
        const { data, error } = await supabase
          .from('blog_reactions')
          .select('*')
          .eq('blog_id', article.id)
          .eq('user_id', user.id)
          .single()
        
        if (data) {
          setHasReacted(true)
        }
      } else {
        // For non-authenticated users, check localStorage
        const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '[]')
        setHasReacted(localReactions.includes(article.id))
      }
    } catch (err) {
      // User hasn't reacted or not logged in
      console.log('No reaction found')
    }
  }

  const handleReaction = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to blog detail
    e.stopPropagation()

    if (isLiking) return // Prevent multiple clicks

    setIsLiking(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (hasReacted) {
        // Remove reaction
        const newCount = Math.max(0, reactionCount - 1)
        
        // Update blog reaction count
        const { error: updateError } = await supabase
          .from('blogs')
          .update({ reaction: newCount })
          .eq('id', article.id)
        
        if (updateError) throw updateError

        if (user) {
          // Remove from blog_reactions table
          const { error: deleteError } = await supabase
            .from('blog_reactions')
            .delete()
            .eq('blog_id', article.id)
            .eq('user_id', user.id)
          
          if (deleteError) throw deleteError
        } else {
          // Remove from localStorage for non-authenticated users
          const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '[]')
          const updatedReactions = localReactions.filter((id: number) => id !== article.id)
          localStorage.setItem('blog_reactions', JSON.stringify(updatedReactions))
        }

        setReactionCount(newCount)
        setHasReacted(false)
      } else {
        // Add reaction
        const newCount = reactionCount + 1
        
        // Update blog reaction count
        const { error: updateError } = await supabase
          .from('blogs')
          .update({ reaction: newCount })
          .eq('id', article.id)
        
        if (updateError) throw updateError

        if (user) {
          // Add to blog_reactions table
          const { error: insertError } = await supabase
            .from('blog_reactions')
            .insert([{
              blog_id: article.id,
              user_id: user.id
            }])
          
          if (insertError) throw insertError
        } else {
          // Add to localStorage for non-authenticated users
          const localReactions = JSON.parse(localStorage.getItem('blog_reactions') || '[]')
          localReactions.push(article.id)
          localStorage.setItem('blog_reactions', JSON.stringify(localReactions))
        }

        setReactionCount(newCount)
        setHasReacted(true)
      }
    } catch (err) {
      console.error('Error updating reaction:', err)
      // Revert on error
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Link 
      href={`/blog/${article.slug || article.id}`} 
      className="block group h-full"
    >
      <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">

        {/* Cover Image */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">

          {/* Author + Reaction */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={article.userImage}
                  alt={article.username}
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.username}</p>
                {article.date && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </p>
                )}
              </div>
            </div>

            {/* Likes - Interactive Toggle */}
            <button
              onClick={handleReaction}
              disabled={isLiking}
              className={`flex items-center gap-1.5 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                hasReacted 
                  ? 'text-red-600' 
                  : 'text-gray-400 hover:text-red-600'
              }`}
              title={hasReacted ? "Remove like" : "Like this article"}
            >
              <BiHeart 
                className={`w-5 h-5 transition-all ${isLiking ? 'animate-pulse' : ''}`} 
                style={{ fill: hasReacted ? 'currentColor' : 'none' }} 
              />
              <span className="text-sm font-bold">{reactionCount}</span>
            </button>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-lime-600 transition-colors line-clamp-2 mb-3">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-3">
            {article.excerpt || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi autem necessitatibus totam quaerat."}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              {article.readTime && (
                <>
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </>
              )}
            </div>

            <span className="font-bold text-lime-600 group-hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;