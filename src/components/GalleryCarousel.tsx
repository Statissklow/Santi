"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export interface GalleryImage {
    src: string;
    alt: string;
    label: string;
    category?: string;
    details?: string;
}

interface GalleryCarouselProps {
    images: GalleryImage[];
    onSelect?: (src: string) => void;
    autoPlayInterval?: number;
}

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.96,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring" as const, stiffness: 320, damping: 32 },
            opacity: { duration: 0.28 },
            scale: { duration: 0.28 },
        },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -400 : 400,
        opacity: 0,
        scale: 0.96,
        transition: {
            x: { type: "spring" as const, stiffness: 320, damping: 32 },
            opacity: { duration: 0.24 },
            scale: { duration: 0.24 },
        },
    }),
};

export function GalleryCarousel({
    images,
    onSelect,
    autoPlayInterval = 5000,
}: GalleryCarouselProps) {
    const [[currentIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
    const [isPaused, setIsPaused] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const changeSlide = useCallback((newDirection: number) => {
        setSlide(([prevIndex]) => {
            const nextIndex = (prevIndex + newDirection + images.length) % images.length;
            return [nextIndex, newDirection];
        });
    }, [images.length]);

    const goToSlide = useCallback((targetIndex: number) => {
        setSlide(([prevIndex]) => {
            if (targetIndex === prevIndex) return [prevIndex, 0];
            const dir = targetIndex > prevIndex ? 1 : -1;
            return [targetIndex, dir];
        });
    }, []);

    // Autoplay
    useEffect(() => {
        if (isPaused || lightboxIndex !== null || images.length <= 1) return;
        const timer = setInterval(() => {
            changeSlide(1);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPaused, lightboxIndex, images.length, autoPlayInterval, changeSlide]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") {
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
            }
            if (e.key === "ArrowLeft") {
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, images.length]);

    if (!images || images.length === 0) return null;

    const currentImage = images[currentIndex];

    const handleImageClick = () => {
        if (onSelect) {
            onSelect(currentImage.src);
        } else {
            setLightboxIndex(currentIndex);
        }
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Carousel Display Box */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#14151e] shadow-2xl">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full cursor-pointer group"
                        onClick={handleImageClick}
                    >
                        <Image
                            src={currentImage.src}
                            alt={currentImage.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />

                        {/* Top Gradient for badge */}
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

                        {/* Category badge & counter */}
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3 z-10">
                            {currentImage.category && (
                                <span className="text-xs font-bold uppercase tracking-wider text-[#e44c65] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e44c65]/40 shadow-lg">
                                    {currentImage.category}
                                </span>
                            )}
                            <span className="text-xs font-medium text-white/70 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Zoom Hint Icon */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={16} />
                        </div>

                        {/* Bottom Gradient & Caption */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 sm:p-8 pt-16">
                            <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-1">
                                {currentImage.label}
                            </h3>
                            {currentImage.details && (
                                <p className="text-white/70 text-xs sm:text-sm max-w-2xl leading-relaxed line-clamp-2">
                                    {currentImage.details}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Left/Right Navigation Buttons */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        changeSlide(-1);
                    }}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-[#e44c65] text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Vorheriges Bild"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        changeSlide(1);
                    }}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-[#e44c65] text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Nächstes Bild"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 overflow-x-auto py-2 px-1">
                {images.map((img, idx) => (
                    <button
                        key={img.src + idx}
                        onClick={() => goToSlide(idx)}
                        className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex-shrink-0 ${
                            idx === currentIndex
                                ? "w-16 h-11 sm:w-20 sm:h-14 ring-2 ring-[#e44c65] opacity-100 scale-105 shadow-[0_0_15px_rgba(228,76,101,0.5)]"
                                : "w-12 h-9 sm:w-14 sm:h-10 opacity-40 hover:opacity-80 ring-1 ring-white/10"
                        }`}
                        aria-label={`Gehe zu Bild ${idx + 1}: ${img.label}`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Fullscreen Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
                    onClick={() => setLightboxIndex(null)}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[lightboxIndex].src}
                            alt={images[lightboxIndex].alt}
                            fill
                            className="object-contain"
                            quality={100}
                        />

                        {/* Lightbox Caption */}
                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-white font-bold text-lg">{images[lightboxIndex].label}</p>
                            {images[lightboxIndex].details && (
                                <p className="text-white/70 text-xs sm:text-sm mt-1">{images[lightboxIndex].details}</p>
                            )}
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-[#e44c65] transition-colors p-3 bg-black/60 rounded-full border border-white/20 backdrop-blur-md cursor-pointer"
                            aria-label="Schließen"
                        >
                            <X size={24} />
                        </button>

                        {/* Lightbox Prev / Next */}
                        <button
                            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#e44c65] border border-white/20 transition-all cursor-pointer"
                            aria-label="Vorheriges Bild"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-[#e44c65] border border-white/20 transition-all cursor-pointer"
                            aria-label="Nächstes Bild"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
