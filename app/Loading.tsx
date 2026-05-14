"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Add Google Fonts
if (typeof document !== "undefined") {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const MINIMUM_DELAY = 3800;
    const EXTRA_HOLD_TIME = 1000;
    const TOTAL_DELAY = MINIMUM_DELAY + EXTRA_HOLD_TIME;

    const finishLoading = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = TOTAL_DELAY - elapsed;
      setTimeout(() => setIsLoading(false), remaining > 0 ? remaining : 0);
    };

    document.fonts?.ready.then(() => {
      setTimeout(finishLoading, MINIMUM_DELAY);
    });

    const forceHide = setTimeout(() => setIsLoading(false), TOTAL_DELAY + 1000);
    return () => clearTimeout(forceHide);
  }, []);

  // Detect DevTools toggle / resize and force resume if stuck
  useEffect(() => {
    const handleResizeOrVisibility = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (isLoading && elapsed > 2000) {
        console.warn("Force ending loading due to potential DevTools pause");
        setIsLoading(false);
      }
    };

    window.addEventListener("resize", handleResizeOrVisibility);
    document.addEventListener("visibilitychange", handleResizeOrVisibility);
    return () => {
      window.removeEventListener("resize", handleResizeOrVisibility);
      document.removeEventListener(
        "visibilitychange",
        handleResizeOrVisibility,
      );
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  const text = "BRIGHT HORIZON";

  return (
    <>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            minHeight: "100dvh",
            background:
              "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)",
          }}
        >
          {/* Subtle Gradient Orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Premium Geometric Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0 overflow-hidden"
          >
            {/* Vertical lines */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.6 + i * 0.05,
                  ease: "easeOut",
                }}
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                style={{
                  left: `${(i + 1) * 5}%`,
                  transformOrigin: "top",
                }}
              />
            ))}
            {/* Horizontal lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.8 + i * 0.05,
                  ease: "easeOut",
                }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                style={{
                  top: `${(i + 1) * 10}%`,
                  transformOrigin: "left",
                }}
              />
            ))}
          </motion.div>

          <div className="text-center px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.2,
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center justify-center"
            >
              <img
                src="/images/loading.png"
                alt="BHI Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4"
              />
            </motion.div>

            {/* BRIGHT HORIZON */}
            <motion.h1
              className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-none"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{
                    color: "#303079",
                    filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* INSTITUTE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.2,
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 sm:mt-8"
            >
              <motion.h1
                className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] text-[#303079] tracking-tighter uppercase leading-none"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
              >
                INSTITUTE
              </motion.h1>
            </motion.div>

            {/* Decorative Middle Ornament */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 my-10 sm:my-14"
            >
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 border border-amber-400 rotate-45"
              />
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </motion.div>

            {/* Premium Progress Bar */}
            <motion.div
              className="mt-16 sm:mt-20 w-80 sm:w-96 md:w-[28rem] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className="relative h-[2px] bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-800 via-amber-500 to-slate-800"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  style={{
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)",
                  }}
                />
              </div>
            </motion.div>

            {/* Decorative Bottom Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ duration: 1.2, delay: 3.2, ease: "easeOut" }}
              className="mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            />

            {/* Floating Particles - Subtle */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)",
                    filter: "blur(0.5px)",
                  }}
                  initial={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
                    x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                    opacity: [0, 0.6, 0.6, 0],
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 6 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Corner Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-400"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-amber-400"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.4 }}
              className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-amber-400"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.6 }}
              className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-400"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
