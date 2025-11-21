"use client";

import React from "react";
import { Info, AlertCircle, Pin } from "lucide-react";

const GuidelinesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* Response Time */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Info className="w-9 h-9 text-violet-600 drop-shadow-sm" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Response Time
            </h2>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Please allow up to{" "}
            <span className="font-semibold text-violet-700">24 hours</span> for a
            response. Messages sent on weekends or holidays will be answered on
            the next business day.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Important Guidelines */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-10">
            <AlertCircle className="w-9 h-9 text-violet-600 drop-shadow-sm" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Important Guidelines
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
            <ul className="space-y-6 max-w-4xl mx-auto text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-violet-600 text-2xl leading-none">•</span>
                <span>
                  Always reach out to the{" "}
                  <strong>correct contact person</strong> based on your concern.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-violet-600 text-2xl leading-none">•</span>
                <span>
                  Keep all communication{" "}
                  <strong>professional, respectful, and clear</strong>.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-violet-600 text-2xl leading-none">•</span>
                <span>
                  When texting, always include your{" "}
                  <strong>full name, program, and reason for contact</strong> so we can assist you faster.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-violet-600 text-2xl leading-none">•</span>
                <span>
                  For emergencies, contact the Main Office at{" "}
                  <strong className="text-violet-700">201-377-1594</strong>{" "}
                  between <strong>9:00 AM – 2:00 PM</strong>.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Footer Note */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl py-10 px-10 border border-blue-200 shadow-md">
          <div className="flex items-center justify-center gap-3 text-blue-700 mb-3">
            <Pin className="w-8 h-8 rotate-12 drop-shadow-sm" />
            <span className="text-2xl font-bold tracking-wide">Important</span>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Please keep this sheet in a safe place. It serves as your{" "}
            <strong>official guide</strong> for contacting the school. Refer to 
            it whenever you need assistance or clarification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
