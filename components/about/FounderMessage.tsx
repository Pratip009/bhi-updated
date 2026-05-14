/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Quote, Award, TrendingUp, Users } from "lucide-react";

const FounderMessage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gray-200 py-24 relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium tracking-wide shadow-sm">
              LEADERSHIP VISION
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Founder's Message
          </h1>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-gray-400"></div>
            <Quote className="w-6 h-6 text-gray-500" />
            <div className="h-px w-24 bg-gray-400"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT – Message Card */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Card */}
            <div className="relative bg-white shadow-2xl overflow-hidden transform transition-all duration-700 hover:shadow-3xl">
              {/* Thin accent line */}
              <div className="h-0.5 bg-gray-900"></div>

              {/* Content */}
              <div className="p-10 sm:p-12 lg:p-14">
                {/* Quote Icon */}
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className={`w-16 h-16 bg-gray-900 flex items-center justify-center shadow-lg transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                {/* Message Text */}
                <div className="space-y-6">
                  <p
                    className="text-gray-700 leading-[1.8] text-justify text-base"
                    style={{
                      textJustify: "inter-word",
                      hyphens: "auto",
                      wordSpacing: "normal",
                    }}
                  >
                    At Bright Horizon Institute, our purpose is to equip
                    students with the skills, confidence, and mindset needed to
                    thrive in today’s fast-changing world. Our programs are
                    thoughtfully designed to deliver real-world training,
                    professional discipline, and a learning experience that is
                    supportive, practical, and focused entirely on your
                    growth.{" "}
                  </p>
                </div>

                {/* Signature Section */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-light text-gray-900 mb-1 tracking-tight">
                        Mahek Rizwan
                      </p>
                      <p className="text-gray-600 font-light tracking-wider text-sm uppercase">
                        Co-Founder
                      </p>
                      <p className="text-gray-500 font-light text-sm mt-1">
                        Bright Horizon Institute
                      </p>
                    </div>
                    <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center">
                      <Award className="w-7 h-7 text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 bg-gray-200"></div>
            </div>
          </div>

          {/* RIGHT – Image Section */}
          <div className="relative group">
            {/* Main Image Frame */}
            <div className="relative transform transition-all duration-700 group-hover:scale-[1.02]">
              {/* Outer border frame */}
              <div className="absolute -inset-4 border border-gray-300 pointer-events-none"></div>

              {/* Inner frame */}
              <div className="relative bg-white p-4 shadow-2xl">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gray-900"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-900"></div>

                {/* Image Placeholder */}
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                  <Image
                    src="/images/founderbw.jpeg"
                    alt="Mahek Rizwan - Co-Founder"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Name plate */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-3 shadow-lg">
                <p className="font-light tracking-widest text-sm">
                  MAHEK RIZWAN
                </p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default FounderMessage;
