"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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

    // NEW: Detect DevTools toggle / resize and force resume if stuck
    useEffect(() => {
        const handleResizeOrVisibility = () => {
            const elapsed = Date.now() - startTimeRef.current;
            if (isLoading && elapsed > 2000) { // If stuck >2s, force end
                console.warn('Force ending loading due to potential DevTools pause');
                setIsLoading(false);
            }
        };

        window.addEventListener('resize', handleResizeOrVisibility);
        document.addEventListener('visibilitychange', handleResizeOrVisibility);
        return () => {
            window.removeEventListener('resize', handleResizeOrVisibility);
            document.removeEventListener('visibilitychange', handleResizeOrVisibility);
        };
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [isLoading]);

    return (
        <>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    style={{ minHeight: "100dvh" }}
                >
                    <div className="text-center px-6">
                        {/* BRIGHT HORIZON */}
                        <motion.h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-tight">
                            {"BRIGHT HORIZON".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 120 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.5 + i * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block text-white drop-shadow-2xl"
                                    style={{
                                        textShadow: `
    0 0 10px rgba(255, 215, 0, 0.35),
    0 0 20px rgba(255, 200, 0, 0.25),
    0 0 35px rgba(255, 180, 0, 0.2)
  `
                                    }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>

                            ))}
                        </motion.h1>

                        {/* INSTITUTE */}
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.4, duration: 1.2, ease: "easeOut" }}
                            className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-white"
                            style={{

                                textShadow: "0 0 30px rgba(96, 165, 250, 0.6)",
                            }}
                        >
                            INSTITUTE
                        </motion.h2>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.0, duration: 1.4 }}
                            className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-widest text-gray-300"
                        >
                            Empowering Futures • Building Leaders
                        </motion.p>

                        {/* Progress Bar */}
                        <motion.div
                            className="mt-16 sm:mt-20 w-72 sm:w-80 md:w-96 mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                        >
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3.4, ease: "easeInOut", delay: 0.8 }}
                                />
                            </div>
                        </motion.div>

                        {/* Floating Particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(10)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60 blur-sm"
                                    initial={{ x: `${Math.random() * 100}vw`, y: -20 }}
                                    animate={{ y: "100dvh" }}
                                    transition={{
                                        duration: 12 + i * 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.6,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
}