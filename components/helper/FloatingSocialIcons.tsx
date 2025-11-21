'use client'

import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

type SocialIconProps = {
    Icon: React.ElementType;
    color: string;
    hoverColor: string;
    label: string;
    delay?: number;
};

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, color, hoverColor, label, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group"
            style={{ animation: `slideIn 0.5s ease-out ${delay}s both` }}
        >
            <div
                className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                style={{
                    background: isHovered ? hoverColor : color,
                    border: "2px solid white",
                    boxShadow: isHovered
                        ? `0 8px 25px ${color}80`
                        : `0 4px 15px rgba(0,0,0,0.3)`,
                    transform: isHovered ? "scale(1.15)" : "scale(1)"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Icon className="text-white text-xl transition-all" />
            </div>

            {/* Tooltip */}
            <span
                className="absolute left-16 top-1/2 -translate-y-1/2 text-white text-sm px-3 py-1 rounded-lg transition-all duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: hoverColor,
                    transform: isHovered ? "translateX(0)" : "translateX(-10px)"
                }}
            >
                {label}
            </span>
        </div>
    );
};

export default function FloatingSocialIcons() {
    const [stopFloating, setStopFloating] = useState(false);
    const [show, setShow] = useState(true); // for animation

    const socialLinks = [
        { Icon: FaFacebookF, color: "#1877F2", hoverColor: "#0d65d9", label: "Facebook" },
        { Icon: FaXTwitter, color: "#000", hoverColor: "#333", label: "X (Twitter)" },
        { Icon: FaLinkedinIn, color: "#0A66C2", hoverColor: "#004182", label: "LinkedIn" },
        { Icon: FaInstagram, color: "#E4405F", hoverColor: "#bc1f3e", label: "Instagram" },
    ];

    useEffect(() => {
        const footer = document.querySelector('footer'); // target your existing footer
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(false); // start vanishing animation
                    setTimeout(() => setStopFloating(true), 300); // wait for animation to finish
                } else {
                    setStopFloating(false);
                    setTimeout(() => setShow(true), 10); // slight delay to trigger fade-in animation
                }
            },
            { root: null, threshold: 0 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Floating icons */}
            <div
                className={`fixed bottom-6 left-6 flex flex-col gap-4 z-50 transition-all duration-300 ${
                    show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ pointerEvents: stopFloating ? "none" : "auto" }}
            >
                {!stopFloating &&
                    socialLinks.map((social, index) => (
                        <SocialIcon key={index} {...social} delay={index * 0.1} />
                    ))}
            </div>

            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </>
    );
}
