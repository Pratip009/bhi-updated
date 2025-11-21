"use client";

import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show chatbot only after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setOpen(false); // (optional) auto-close chat when user scrolls up again
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, data.reply]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button (visible only if scroll visible AND chat is closed) */}
      {!open && isVisible && (
        <div className="fixed bottom-20 right-4 group z-50">
          <button
            onClick={() => setOpen(true)}
            className="w-12 h-12 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center 
            text-3xl hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-bounce-slow"
          >
            <FaRobot />
          </button>

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
          bg-black text-white px-3 py-1 rounded-lg text-sm transition-all whitespace-nowrap">
            BHI Assistant
          </span>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[350px] bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 z-50 animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaRobot className="text-xl text-blue-500" /> AI Assistant
            </h3>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-3 p-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg w-fit max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 italic text-sm animate-pulse">
                AI typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-3">
            <input
              className="border p-2 w-full rounded-lg outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
