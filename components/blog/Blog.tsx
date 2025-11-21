import { articleData } from "@/data/data";
import React from "react";
import ArticleCard from "../home/article/ArticleCard";

const Blog = () => {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-lime-500 to-emerald-600 py-32 text-white text-center">
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

          {articleData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {articleData.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-500 py-20">
              No articles found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;