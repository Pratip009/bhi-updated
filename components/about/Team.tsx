'use client'

import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";

const teamMembers = [
    {
        name: "Zeba Fatima",
        role: "FOUNDER & CEO",
        image: "/images/t1.jpg",
        desc: "Leads the institute with a vision for accessible, career-focused education. Oversees strategy, growth, and student success initiatives.",
    },
    {
        name: "Mahek Rizwan",
        role: "FOUNDER, VP",
        image: "/images/t2.jpg",
        desc: "Drives operational excellence and program development to ensure every program delivers real-world value.",
    },
    {
        name: "Jane Cooper",
        role: "EDITOR STAFF",
        image: "/images/t3.jpg",
        desc: "Creates engaging learning content and ensures all materials meet quality, clarity, and training standards.",
    },
    {
        name: "Martin Williamson",
        role: "EDITOR STAFF",
        image: "/images/t4.jpg",
        desc: "Works with instructors to refine curriculum accuracy and maintain high educational consistency.",
    },
    {
        name: "Steven Hanbo",
        role: "EDITOR STAFF",
        image: "/images/t5.jpg",
        desc: "Transforms complex concepts into easy-to-understand learning materials for students across programs.",
    },
    {
        name: "Mike Tan",
        role: "EDITOR STAFF",
        image: "/images/t6.jpg",
        desc: "Reviews and enhances academic modules, ensuring content is student-friendly and industry aligned.",
    },
];

const Team = () => {
    return (
        <div className="pt-16 pb-16 bg-black text-white">
            {/* Heading */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold">Our Team</h1>
                <p className="mt-4 text-gray-300 w-[80%] mx-auto">
                    Meet the dedicated professionals who help shape the learning
                    experience and guide students toward successful careers.
                </p>
            </div>

            {/* Team Members Grid */}
            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                {teamMembers.map((member, index) => (
                    <Tilt
                        key={index}
                        glareEnable={true}
                        glareMaxOpacity={0.15}
                        scale={1.03}
                    >
                        <div
                            className="
      bg-[#111]
      p-8
      rounded-2xl
      shadow-md
      text-center
      transition-all
      duration-300
      ring-1 
      ring-white/10
      hover:ring-white/20
      hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
      hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]
    "
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={112}
                                height={112}
                                className="w-28 h-28 object-cover mx-auto rounded-full shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                            />
                            {/* Name */}
                            <h2 className="text-xl font-semibold mt-5">{member.name}</h2>
                            <p className="text-sm text-gray-400 tracking-widest">
                                {member.role}
                            </p>

                            {/* Description */}
                            <p className="text-gray-300 text-sm mt-4 leading-relaxed text-opacity-60">
                                {member.desc}
                            </p>
                        </div>
                    </Tilt>
                ))}
            </div>
        </div>
    );
};

export default Team;
