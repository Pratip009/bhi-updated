/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiPhoneCall, FiMail } from "react-icons/fi";

const StillHaveQuestions = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ---------- Main Section ---------- */}
            <div className="w-full bg-[#E5E8EC] py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-black text-white rounded-[32px] px-6 py-20 text-center">

                        <h2 className="text-3xl md:text-4xl font-bold">
                            Still have questions?
                        </h2>

                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                            Our admissions team is here to help you every step of the way.
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-8 bg-white text-black font-semibold px-8 py-3 rounded-full shadow hover:shadow-md transition"
                        >
                            Contact Us
                        </button>

                    </div>
                </div>
            </div>



            {/* ---------- Modal Overlay ---------- */}
            {open && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] px-4">

                    {/* ---------- Modal Card ---------- */}
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 relative animate-fadeIn">

                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        >
                            <IoClose size={26} />
                        </button>

                        <h3 className="text-2xl font-bold text-center">Contact Us</h3>

                        <p className="text-gray-500 text-center mt-2">
                            Talk to our admissions team — we're here to help.
                        </p>

                        <div className="mt-8 space-y-4">

                            {/* Phone */}
                            <div className="flex items-center gap-4 bg-gray-100 px-5 py-4 rounded-2xl">
                                <FiPhoneCall size={24} className="text-black" />
                                <div>
                                    <p className="text-sm text-gray-600">Call Us</p>
                                    <p className="text-lg font-semibold text-black">201-377-1594</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4 bg-gray-100 px-5 py-4 rounded-2xl">
                                <FiMail size={24} className="text-black" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="text-lg font-semibold text-black">admin@bhilearning.com</p>
                                </div>
                            </div>

                        </div>

                        {/* Bottom Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-8 w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

            {/* Tailwind animation */}
            <style>
                {`
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>

        </>
    );
};

export default StillHaveQuestions;
