/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CourseCard from "../home/course/CourseCard";
import { supabase } from "@/lib/supabaseClient";

const COURSES_PER_PAGE = 6;

interface Course {
  id: number;
  image: string;
  title: string;
  price: number;
  teacher: string;
  reviewNumber: number;
  weeks: number;
  hours: number;
  category: string;
  preRequisite: string;
  certification: string;
  description: string;
}

const CourseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const filterOptions = ["All", "Medical", "IT", "Business", "Hospitality", "Technical"];

  // Fetch all courses from Supabase
  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAllCourses(data || []);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  // Filter courses based on selected category and search term
  const filteredCourses = React.useMemo(() => {
    return allCourses.filter((course) => {
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
  }, [allCourses, selectedCategory, searchTerm]);

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

  // Initial loading state
  if (isFetching) {
    return (
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Courses</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchCourses}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state - no courses in database
  if (allCourses.length === 0) {
    return (
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Courses Available</h3>
            <p className="text-gray-600">Check back later for new courses!</p>
          </div>
        </div>
      </section>
    );
  }

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
                  ${
                    selectedCategory === cat
                      ? "bg-violet-600 text-white shadow-lg"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {searchTerm || selectedCategory !== "All" ? (
          <div className="mb-6 text-gray-600">
            Found <span className="font-semibold text-violet-600">{filteredCourses.length}</span> course
            {filteredCourses.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        ) : null}

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
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            <p className="text-gray-600 mt-4">Loading more courses...</p>
          </div>
        )}

        {/* End of results */}
        {!hasMore && visibleCourses.length > 0 && !isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-500 font-medium">
              You've seen all {filteredCourses.length} available course{filteredCourses.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* No results */}
        {visibleCourses.length === 0 && !isFetching && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              No courses found
            </p>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;