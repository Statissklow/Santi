"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/CtaButton";

export default function LessonsPage() {
    const [activeTab, setActiveTab] = useState("drums");

    // Content Data
    const content = {
        drums: {
            title: "Schlagzeug",
            image: "/images/Santiondrums.JPG",
            alt: "Santino Scavelli Drums",
            text: (
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                    <h3 className="text-3xl font-bold text-white mb-4">Schlagzeug Unterricht</h3>
                    <p>
                        Santino Scavelli bietet professionellen Schlagzeugunterricht für Anfänger, Fortgeschrittene und Profis.
                        Mit über 15 Jahren Erfahrung wird der Unterricht individuell auf deine Ziele und Bedürfnisse abgestimmt – egal ob Technik, Groove, Blattspiel oder musikalische Ausdruckskraft.
                    </p>
                    <p>
                        Der Unterricht findet in entspannter Atmosphäre im voll ausgestatteten Studio statt.
                    </p>
                </div>
            )
        },
        latin: {
            title: "Latin Percussion",
            image: "/images/latinpercussion.jpg",
            alt: "Latin Percussion",
            text: (
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                    <h3 className="text-3xl font-bold text-white mb-4">Latin Percussion</h3>
                    <p>
                        Tauchen Sie ein in die rhythmische Welt Lateinamerikas. Von Congas über Bongos bis hin zu Timbales – lernen Sie die
                        traditionellen Techniken und Rhythmen, die diese Musik so lebendig machen.
                    </p>
                    <p>
                        Der Unterricht umfasst Handtechniken, Koordination und das Zusammenspiel in einer Percussion-Sektion.
                    </p>
                </div>
            )
        },
        oriental: {
            title: "Orientalische Percussion",
            image: "/images/orientalische Percussion.jpg",
            alt: "Oriental Percussion",
            text: (
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                    <h3 className="text-3xl font-bold text-white mb-4">Orientalische Percussion</h3>
                    <p>
                        Entdecken Sie die faszinierenden Klänge des Orients. Unterricht an Darbuka, Riq (Rahmentrommel) und anderen traditionellen Instrumenten.
                    </p>
                    <p>
                        Lernen Sie komplexe ungerade Taktarten (7/8, 9/8, 10/8) und die filigrane Fingertechnik, die für diesen Stil charakteristisch ist.
                    </p>
                </div>
            )
        },
        hybrid: {
            title: "Hybrid Setup",
            image: "/images/Hybrid.jpg",
            alt: "Hybrid Drum Setup",
            text: (
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                    <h3 className="text-3xl font-bold text-white mb-4">Hybrid Setup</h3>
                    <p>
                        Die Verschmelzung von Schlagzeug und Percussion. Santinos Spezialgebiet.
                    </p>
                    <p>
                        Lernen Sie, wie man Percussion-Instrumente in ein Schlagzeug-Setup integriert, um einzigartige Klangfarben und Grooves zu erzeugen.
                        Perfekt für Drummer, die ihren Sound erweitern wollen.
                    </p>
                </div>
            )
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-20 font-[family-name:var(--font-lato)]">
            <main className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <section className="text-center space-y-6 pt-8">
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">Unterricht</h1>
                    <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto">
                        Lerne von einem Profi mit über 15 Jahren Erfahrung.
                    </p>
                </section>

                {/* Main Content Card (Glassmorphism Layout) */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">

                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1 space-y-8">
                        <nav className="flex flex-col space-y-2">
                            {Object.entries(content).map(([key, data]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={cn(
                                        "text-left px-6 py-4 rounded-xl transition-all duration-300 font-bold border border-transparent",
                                        activeTab === key
                                            ? "bg-[#e44c65] text-white shadow-lg scale-105"
                                            : "text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10"
                                    )}
                                >
                                    {data.title}
                                </button>
                            ))}
                        </nav>

                        <div className="bg-[#1c1d26]/50 p-6 rounded-2xl border border-white/10 shadow-lg mt-8">
                            <h3 className="text-lg font-bold text-white mb-4">Interesse?</h3>
                            <CtaButton
                                href="mailto:info@santinoscavelli.de"
                                className="w-full text-center text-lg shadow-lg"
                            >
                                Probestunde buchen
                            </CtaButton>
                        </div>
                    </aside>

                    {/* Content Display */}
                    <main className="lg:col-span-3 space-y-8">
                        {/* Dynamic Image */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src={content[activeTab as keyof typeof content].image}
                                alt={content[activeTab as keyof typeof content].alt}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d26] via-transparent to-transparent opacity-80" />
                        </div>

                        {/* Dynamic Text */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {content[activeTab as keyof typeof content].text}
                        </div>
                    </main>

                </section>
            </main>
        </div>
    );
}
