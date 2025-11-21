'use client'

import { galleryData } from "@/data/data";
import Image from "next/image";
import { useState } from "react";

interface GalleryItem {
    id: number;
    image: string;
}

const GalleryGrid = () => {
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [loaded, setLoaded] = useState<Record<number, boolean>>({});

    const openPrev = (e: any) => {
        e.stopPropagation();
        if (!selected) return;
        const idx = galleryData.findIndex(item => item.id === selected.id);
        const prev = galleryData[(idx - 1 + galleryData.length) % galleryData.length];
        setSelected(prev);
    };

    const openNext = (e: any) => {
        e.stopPropagation();
        if (!selected) return;
        const idx = galleryData.findIndex(item => item.id === selected.id);
        const next = galleryData[(idx + 1) % galleryData.length];
        setSelected(next);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryData.map((item, i) => (
                        <div
                            key={item.id}
                            onClick={() => setSelected(item)}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md bg-white transform transition-all"
                            style={{
                                animation: `fadeSlideUp 0.6s ease-out ${i * 0.08}s both`
                            }}
                        >
                            <div className="aspect-square relative overflow-hidden">

                                {/* Loader */}
                                {!loaded[item.id] && (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}

                                {/* Image */}
                                <Image
                                    src={item.image}
                                    alt={`Gallery ${item.id}`}
                                    fill
                                    onLoad={() =>
                                        setLoaded(prev => ({ ...prev, [item.id]: true }))
                                    }
                                    className={`object-cover duration-500 ${loaded[item.id]
                                        ? "opacity-100 group-hover:scale-110"
                                        : "opacity-0"
                                        }`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>

                            {/* View Label */}
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all">
                                <p className="text-lg font-medium flex items-center gap-2">
                                    <span className="w-3 h-3 bg-white rounded-full"></span>
                                    View Image
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                    style={{ animation: "fadeIn 0.3s ease-out" }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelected(null)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                    >
                        ✕
                    </button>

                    {/* Modal Image Box */}
                    <div
                        className="relative w-full max-w-3xl h-[75vh] mx-auto rounded-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                        style={{ animation: "scaleIn 0.35s ease-out" }}
                    >
                        <Image
                            src={selected.image}
                            alt="Selected"
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                        <button
                            onClick={openPrev}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                        >
                            ◀
                        </button>
                        <button
                            onClick={openNext}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            )}



            <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </>
    );
};

export default GalleryGrid;
