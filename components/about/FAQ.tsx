/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "Where is the school located?",
    answer: "910 Bergen Ave, Floor 3, Jersey City, NJ 07306",
  },
  {
    question: "Do I need a high school diploma to enroll?",
    answer: `Yes — students must have a high school diploma or GED.

We offer a GED course that can be taken alongside the cosmetology program for eligible students.`,
  },
  {
    question: "When can I start?",
    answer: `New classes begin on the first Monday of every month.

Students are expected to enroll at least two weeks in advance of their desired start date to complete orientation and required documentation.`,
  },
  {
    question: "Is the program in-person or online?",
    answer: `We offer both:

- Hybrid format (online theory + in-person hands-on training)
- Fully online theory-based training (practical components must still be completed in person to meet state board requirements)

We are Jersey City's only hybrid cosmetology school.`,
  },
  {
    question: "How long are the programs?",
    answer: `Based on NJ State Board standards:

- Cosmetology & Hairstyling: 1,200 hours
- Nail Technology: 300 hours

Program duration may vary based on your chosen schedule (full-time or part-time).`,
  },
  {
    question: "What's included in the tuition?",
    answer: `- Full cosmetology or nail kit
- Uniform
- Books and learning materials
- Laptop
- Access to our online learning platform
- State Board exam prep`,
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible installment plans to make tuition more manageable and accessible.",
  },
  {
    question: "What class schedules are available?",
    answer: "We offer both day and evening classes to accommodate your availability.\n\n[Ask our admissions team for the current schedule.]",
  },
  {
    question: "Do students get hands-on experience?",
    answer: "Yes — students practice on real clients in our student salon/clinic under instructor supervision. This hands-on experience is required by the NJ State Board.",
  },
  {
    question: "Will I be licensed after completing the course?",
    answer: "Yes. Once you complete the required hours and pass the New Jersey State Board Exam, you'll be eligible for professional licensure.",
  },
  {
    question: "Do you help students find jobs after graduation?",
    answer: `Yes! All graduates receive lifetime alumni support, including:

- Job placement assistance
- Resume and interview support
- Ongoing career coaching

You're always welcome to come back for help — even years after graduation.`,
  },
  {
    question: "What is the minimum age to apply?",
    answer: "You must be at least 17 years old to enroll in a New Jersey State Board-approved cosmetology program.",
  },
  {
    question: "Can I visit the school before enrolling?",
    answer: "Yes! Walk-in visits are welcome.\n\nTour our campus, meet our staff, ask questions, and even enroll on the spot — no appointment needed.",
  },
  {
    question: "Are there any school policies I should know about?",
    answer: `Yes. As a licensed institution, we follow all NJ State Board rules, including:

- Mandatory attendance and time tracking
- Uniform dress code during class and salon work
- Professional conduct expectations

Students receive a full policy handbook at orientation.`,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumn = faqData.filter((_, i) => i % 2 === 0);
  const rightColumn = faqData.filter((_, i) => i % 2 === 1);

  const FAQItem = ({ item, index }: { item: typeof faqData[0]; index: number }) => {
    const isOpen = openIndex === index;
    
    return (
      <div className="mb-4">
        <button
          onClick={() => toggle(index)}
          className={`w-full text-left p-5 transition-all duration-300 
          ${isOpen 
            ? "bg-black text-white shadow-xl rounded-t-2xl" 
            : "bg-white text-black hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100 rounded-2xl"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold text-base pr-4">{item.question}</span>
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${isOpen ? "bg-white/20" : "bg-gray-100"}`}
            >
              <svg
                className={`w-4 h-4 ${isOpen ? "text-white" : "text-gray-600"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence initial={false} mode="wait">
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0, scaleY: 0.95 }}
              animate={{ 
                height: "auto", 
                opacity: 1, 
                scaleY: 1,
                transition: { 
                  height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.25, delay: 0.1 },
                  scaleY: { duration: 0.3 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                scaleY: 0.95,
                transition: { 
                  height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.2 },
                  scaleY: { duration: 0.25 }
                }
              }}
              style={{ originY: 0 }}
              className="overflow-hidden bg-black text-white rounded-b-2xl -mt-2"
            >
              <div className="px-5 pb-5 pt-2">
                <div className="pt-3 border-t border-white/20">
                  <p className="text-sm leading-relaxed whitespace-pre-line opacity-90">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-gray-200 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-4"
          >
            Got Questions?
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg"
          >
            Everything you need to know about our programs, enrollment, and more. 
            Can't find what you're looking for? Feel free to contact us.
          </motion.p>
        </div>

        {/* FAQ Grid - Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            {leftColumn.map((item, i) => (
              <FAQItem key={i * 2} item={item} index={i * 2} />
            ))}
          </div>
          <div>
            {rightColumn.map((item, i) => (
              <FAQItem key={i * 2 + 1} item={item} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;