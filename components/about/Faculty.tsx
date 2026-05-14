'use client'

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const facultyData = [
  {
    id: 1,
    name: "John Doe",
    subject: "Computer Science",
    category: "Tech",
    description: "Expert in web development and AI.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "Nursing",
    category: "Medical",
    description: "Experienced in clinical training and patient care.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Lee",
    subject: "Business Management",
    category: "Non-Tech",
    description: "Specialist in business strategy and leadership.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Sarah Connor",
    subject: "Cybersecurity",
    category: "Tech",
    description: "Focuses on network security and ethical hacking.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Emily Clark",
    subject: "Pharmacy",
    category: "Medical",
    description: "Expert in pharmaceuticals and patient counseling.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "David Kim",
    subject: "Graphic Design",
    category: "Non-Tech",
    description: "Teaches design principles and digital art.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "Linda Johnson",
    subject: "AI & ML",
    category: "Tech",
    description: "Specializes in machine learning and data science.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 8,
    name: "Robert Brown",
    subject: "Physiotherapy",
    category: "Medical",
    description: "Expert in rehabilitation and fitness therapy.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 9,
    name: "Sophia Turner",
    subject: "Accounting",
    category: "Non-Tech",
    description: "Focuses on finance and accounting principles.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    name: "Chris Evans",
    subject: "Software Engineering",
    category: "Tech",
    description: "Teaches backend development and DevOps.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const categories = ["All", "Tech", "Medical", "Non-Tech"];

const Faculty = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredFaculty =
    selectedCategory === "All"
      ? facultyData
      : facultyData.filter((f) => f.category === selectedCategory);

  const displayedFaculty = showAll ? filteredFaculty : filteredFaculty.slice(0, 4);
  const hasMore = filteredFaculty.length > 4;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          
          {/* Left Side - Title, Description, Categories */}
          <div className="lg:w-1/3 lg:sticky lg:top-20 lg:self-start mb-10 lg:mb-0">
            <div className="lg:pr-8">
              <span className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-4">
                Our Team
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Meet Our Faculty
              </h2>

              <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
                Our faculty are experts in their fields, combining real-world experience
                with a passion for teaching. They guide students to excel and succeed.
              </p>

              {/* Categories - Vertical on desktop, horizontal scroll on mobile */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowAll(false);
                    }}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap text-left ${
                      selectedCategory === cat
                        ? "bg-black text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <span className="ml-2 text-sm opacity-70">
                        ({filteredFaculty.length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Faculty Cards */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                {displayedFaculty.map((faculty, index) => (
                  <motion.div
                    key={faculty.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl 
                    transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
                          <Image
                            src={faculty.image}
                            alt={faculty.name}
                            width={80}
                            height={80}
                            className="rounded-xl object-cover w-full h-full 
                            group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 
                          text-xs font-medium rounded-full mb-2">
                            {faculty.category}
                          </span>
                          
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {faculty.name}
                          </h3>
                          
                          <p className="text-sm text-gray-500 font-medium">
                            {faculty.subject}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                        {faculty.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* View More / View Less Button */}
            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-2.5 bg-black text-white font-medium rounded-xl 
                  hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {showAll ? "View Less" : `View More (${filteredFaculty.length - 4} more)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;