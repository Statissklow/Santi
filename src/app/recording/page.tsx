"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryCarousel } from "@/components/GalleryCarousel";

export default function Recording() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const galleryImages = [
        { src: "/images/drumset-iii.jpg", alt: "Studio Drumset", label: "Drumset" },
        { src: "/images/p1142933.jpg", alt: "Studio Detail", label: "Detail" },
        { src: "/images/preamp-iii.jpg", alt: "Preamps", label: "Preamps" },
        { src: "/images/ganzstudio.jpg", alt: "Studio Overview", label: "Studio" },
        { src: "/images/eingang-ii.jpg", alt: "Entrance 2", label: "Entrance II" },
        { src: "/images/hinten.jpg", alt: "Back View", label: "Perspektive" },
        { src: "/images/eingang.jpg", alt: "Entrance 1", label: "Entrance I" },
    ];

    return (
        <div className="min-h-screen p-4 sm:p-20 font-[family-name:var(--font-roboto)]">
            <main className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <section className="text-center space-y-6 pt-8">
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">Studio & Recording</h1>
                    <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto">
                        High-End Drums & Percussion Recording aus dem Rama Studio Mannheim.
                    </p>
                </section>

                {/* Video First Approach */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/UXlT_bLah-o" title="Recording Demo 1" frameBorder="0" allowFullScreen className="group-hover:scale-105 transition-transform duration-700"></iframe>
                    </div>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oiPEmAeXYCY" title="Recording Demo 2" frameBorder="0" allowFullScreen className="group-hover:scale-105 transition-transform duration-700"></iframe>
                    </div>
                </section>

                {/* Main Content & Info */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <div className="lg:col-span-7 space-y-6 text-lg text-white/80 leading-relaxed">
                        <h2 className="text-3xl font-bold text-white mb-4">Professionelle Rhythmusaufnahmen</h2>
                        <p>
                            Santino Scavelli ist ein gefragter Studio-Musiker. In seinem Studio nimmt er für renommierte Künstler (Anika Nilles, Viktor) ihre Alben auf – sei es Percussion, Drums oder beides.
                        </p>
                        <p>
                            Durch die Zusammenarbeit mit erfahrenen Percussionisten und Drummern bieten wir maßgeschneiderte Lösungen für deine musikalischen Projekte.
                            Dank unserer exklusiven Kooperation mit den <strong>Rama Studio</strong> erhältst du hochwertige Aufnahmen in einem professionellen Setting.
                        </p>
                        <p>
                            Besonders gefragt ist sein selbstgebautes hybrides Set, das er <strong className="text-[#e44c65]">&quot;Split-Set&quot;</strong> nennt. Dieses eignet sich hervorragend für organisch-elektronische Beats sowie für folkloristische Musik.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-[#1c1d26] p-8 rounded-2xl border border-[#e44c65]/30 shadow-[0_0_30px_rgba(228,76,101,0.15)]">
                            <h4 className="text-[#e44c65] font-bold text-2xl mb-4">Aufnahme buchen</h4>
                            <p className="text-white/70 mb-6">
                                Ob einfacher Shaker-Loop, komplexe Percussion-Arrangements oder ein vollständiges Drum-Recording. Wir finden den perfekten Sound für deinen Track.
                            </p>
                            <a href="mailto:info@santinoscavelli.de" className="block w-full text-center px-8 py-4 bg-[#e44c65] text-white rounded-xl hover:bg-[#c43c52] transition-all transform hover:scale-[1.02] font-bold shadow-lg">
                                Anfrage senden
                            </a>
                        </div>
                    </div>
                </section>

                {/* Unconventional "Masonry" Gallery */}
                <section className="space-y-8">
                    <h3 className="text-3xl font-bold text-white text-center">Equipment & Studio Vibe</h3>
                    <GalleryCarousel images={galleryImages} onSelect={setSelectedImage} />
                </section>

            </main>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt="Full Screen View"
                            fill
                            className="object-contain"
                            quality={100}
                        />
                        <button
                            className="absolute top-4 right-4 text-white hover:text-[#e44c65] transition-colors p-2 bg-black/50 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
