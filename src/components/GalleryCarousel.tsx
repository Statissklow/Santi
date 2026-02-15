"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
    src: string;
    alt: string;
    label: string;
}

interface GalleryCarouselProps {
    images: GalleryImage[];
    onSelect: (src: string) => void;
}

export function GalleryCarousel({ images, onSelect }: GalleryCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
            {/* Background "Box" styling */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl -z-10 backdrop-blur-sm border border-white/5" />

            <div className="relative h-[400px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout">
                    {images.map((img, index) => {
                        // Calculate offset from current index
                        let offset = index - currentIndex;
                        // Handle infinite wraparound logic for visual positioning if needed, 
                        // but for simplicity, let's keep it 1-to-1 matching or just show 3 items.
                        // Actually, for a "fancy" carousel, let's just show one main and partially others?
                        // Let's stick to a simple 3D card deck or just a clean slider.

                        // Let's go with a simple "active" center One.
                        if (index === currentIndex) {
                            return (
                                <motion.div
                                    key={img.src}
                                    layoutId={img.src}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1, zIndex: 10, x: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, zIndex: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-2 border-[#e44c65]/50"
                                    onClick={() => onSelect(img.src)}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h3 className="text-white text-xl font-bold">{img.label}</h3>
                                    </div>
                                </motion.div>
                            );
                        }
                        return null; // For now, simple single-item slider with animation
                    })}
                </AnimatePresence>

                {/* Preload images to avoid flicker? Next/Image handles this mostly. */}

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 z-20 p-3 bg-black/50 hover:bg-[#e44c65] rounded-full text-white transition-colors backdrop-blur-md"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 z-20 p-3 bg-black/50 hover:bg-[#e44c65] rounded-full text-white transition-colors backdrop-blur-md"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Dots/Thumbnails navigation */}
            <div className="flex justify-center gap-2 mt-6">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? "bg-[#e44c65] w-8" : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
