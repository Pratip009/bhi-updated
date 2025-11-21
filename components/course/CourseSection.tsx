/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CourseCard from "../home/course/CourseCard";
import { coursesData } from "@/data/data";

const COURSES_PER_PAGE = 6;

const CourseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCourses, setVisibleCourses] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const filterOptions = ["All", "Technology", "Business", "Medical", "Hospitality", "Skilled Labor"];

  // Filter courses based on selected category and search term
  const filteredCourses = React.useMemo(() => {
    return coursesData.filter((course) => {
      // Check category
      const categoryMatch =
        selectedCategory === "All" || course.category === selectedCategory;

      // Check search term
      const searchMatch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  // Reset visible courses when filters/search change
  useEffect(() => {
    const firstBatch = filteredCourses.slice(0, COURSES_PER_PAGE);
    setVisibleCourses(firstBatch);
    setPage(1);
    setHasMore(filteredCourses.length > firstBatch.length);
  }, [filteredCourses]);

  // Load more courses on scroll
  useEffect(() => {
    if (page === 1) return;

    setIsLoading(true);

    const start = (page - 1) * COURSES_PER_PAGE;
    const end = start + COURSES_PER_PAGE;
    const nextBatch = filteredCourses.slice(start, end);

    setTimeout(() => {
      setVisibleCourses((prev) => [...prev, ...nextBatch]);
      setHasMore(end < filteredCourses.length);
      setIsLoading(false);
    }, 300);
  }, [page, filteredCourses]);

  // Intersection Observer for infinite scroll
  const lastCourseRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, author or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-96 px-6 py-3 rounded-full border border-gray-300 
                       shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 
                       text-gray-700 placeholder-gray-500"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all 
                  ${selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleCourses.map((course, index) => (
            <div
              key={course.id}
              ref={index === visibleCourses.length - 1 ? lastCourseRef : null}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Spinner */}
        {isLoading && hasMore && visibleCourses.length > 0 && (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        )}

        {/* End of results */}
        {!hasMore && visibleCourses.length > 0 && !isLoading && (
          <div className="col-span-full text-center py-10 text-gray-500">
            You've seen all available courses
          </div>
        )}

        {/* No results */}
        {visibleCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No courses found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;
