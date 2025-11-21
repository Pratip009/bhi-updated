import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiHeart } from 'react-icons/bi';
import { Calendar, Clock } from 'lucide-react';

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

            {/* Likes */}
            <div className="flex items-center gap-1.5 text-red-600">
              <BiHeart className="w-5 h-5 fill-current" />
              <span className="text-sm font-bold">{article.reaction}</span>
            </div>
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