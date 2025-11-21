"use client";

import React from "react";
import { Phone, Mail, MessageCircle, AlertTriangle } from "lucide-react";

const SupportCards = () => {
  type CardColor = "orange" | "blue" | "green" | "red";

  const cards: Array<{
    number: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    color: CardColor;
    bgColor: string;
    borderColor: string;
    gradient: string;
    details: Array<{ label: string; value: string }>;
    note: string;
  }> = [
    {
      number: "1",
      title: "Personal Matters | Transportation",
      subtitle: "Caseworker Questions and Concerns",
      icon: <Phone className="w-6 h-6" />,
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      gradient: "from-orange-50/60 via-white to-white",
      details: [
        { label: "Contact Person", value: "Nancy (Supervisor)" },
        { label: "Phone", value: "973-336-4477" },
        { label: "Method", value: "Text only (calls not accepted)" },
      ],
      note: "For all personal/student support matters. Phone calls will not be answered — text only.",
    },
    {
      number: "2",
      title: "Technical Support | Attendance Issues",
      icon: <Mail className="w-6 h-6" />,
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      gradient: "from-blue-50/60 via-white to-white",
      details: [
        { label: "Contact Method", value: "Email only" },
        { label: "Email", value: "help@philearning.com" },
      ],
      note: "This email is specifically for technical issues (logins, access problems, online platform concerns) or attendance reporting.",
    },
    {
      number: "3",
      title: "Class / Teacher-Related Questions",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      gradient: "from-green-50/60 via-white to-white",
      details: [
        { label: "Contact Method", value: "GroupMe" },
        { label: "Instructions", value: "Please use the GroupMe chat to communicate directly with your teacher(s)." },
      ],
      note: "All academic communication with instructors must go through GroupMe. If you are unable to contact your instructor, please email or call the office for class-related questions.",
    },
    {
      number: "4",
      title: "Urgent Issues / Appointment Requests",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "red",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      gradient: "from-red-50/60 via-white to-white",
      details: [
        { label: "• Main Office Phone (Call Only)", value: "201-377-1594" },
        { label: "• Coordinator (Text Only)", value: "Reham – 201-772-0328" },
      ],
      note: "Use these contacts for urgent matters or to schedule an appointment with administration. Do not use personal numbers for non-urgent questions.",
    },
  ];

  const colorClasses = {
    orange: "text-orange-600 bg-orange-100",
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <section className="py-20">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {cards.map((card) => (
            <div
              key={card.number}
              className={`
                w-full p-8 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                border-l-8 ${card.borderColor}
                bg-gradient-to-br ${card.gradient}
                backdrop-blur-xl
                transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                hover:-translate-y-1
              `}
            >
              {/* Number + Icon */}
              <div className="flex items-start gap-4">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center 
                    font-bold text-xl shadow-md border border-white/60
                    ${colorClasses[card.color]}
                  `}
                >
                  {card.number}
                </div>

                <div
                  className={`
                    p-3 rounded-xl shadow-md border border-white/60 
                    ${colorClasses[card.color]}
                  `}
                >
                  {card.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mt-6 leading-tight">
                {card.title}
              </h3>

              {card.subtitle && (
                <p className="text-gray-700 font-medium mt-1">
                  {card.subtitle}
                </p>
              )}

              {/* Details */}
              <div className="mt-6 space-y-3">
                {card.details.map((item, idx) => (
                  <p key={idx} className="text-gray-800">
                    <span className="font-semibold">{item.label}:</span>{" "}
                    <span className="text-gray-700">{item.value}</span>
                  </p>
                ))}
              </div>

              {/* Note */}
              <p className="mt-6 text-sm text-gray-600 italic border-t pt-4 border-gray-300/60 leading-relaxed">
                {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportCards;
