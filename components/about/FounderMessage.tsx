/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Tilt from "react-parallax-tilt";

const FounderMessage = () => {
    return (
        <div className="bg-gray-200 pt-16 pb-16 relative overflow-hidden">
            
            {/* Decorative Background Image */}
            <Image
                src="/images/cb.png"
                alt="Decorative"
                width={800}
                height={800}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 
                sm:left-[25%] sm:translate-x-0
                w-[500px] sm:w-[700px] md:w-[800px] opacity-60 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT – Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6 z-10"
                    >
                        <h1 className="text-4xl md:text-5xl text-gray-900 font-bold text-center">
                            Founder's Message
                        </h1>

                        <div className="border-l-2 border-rose-300 pl-6 space-y-6">
                            <Quote className="text-rose-300 w-8 h-8" />

                            <p className="text-gray-600 leading-relaxed">
                                At Bright Horizon Institute, our purpose is to equip students with
                                the skills, confidence, and mindset needed to thrive in today’s
                                fast-changing world.
                            </p>

                            <p className="text-gray-600 leading-relaxed">
                                Our programs are thoughtfully designed to deliver real-world
                                training, professional discipline, and a learning experience that
                                is supportive, practical, and focused entirely on your growth.
                            </p>

                            <h3 className="text-lg font-medium text-gray-900 pt-4">
                                Founder, Bright Horizon Institute
                            </h3>
                        </div>
                    </motion.div>

                    {/* RIGHT – Image */}
                    <Tilt>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex justify-center lg:justify-end z-10"
                        >
                            <Image
                                src="/images/founder.png"
                                alt="Founder"
                                width={520}
                                height={520}
                                className="rounded-xl object-cover w-full max-w-[420px]"
                            />
                        </motion.div>
                    </Tilt>

                </div>
            </div>
        </div>
    );
};

export default FounderMessage;
