"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryCarousel } from "@/components/GalleryCarousel";

// ─── Audio Player Component ───────────────────────────────────────────────────
function BeforeAfterPlayer({
    label,
    beforeLabel,
    afterLabel,
}: {
    label: string;
    beforeLabel: string;
    afterLabel: string;
}) {
    const [active, setActive] = useState<"before" | "after">("before");

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 sm:p-8 space-y-6 hover:border-white/20 transition-colors">
            <p className="text-white/50 text-xs uppercase tracking-[0.24em] font-medium">{label}</p>
            <div className="flex gap-3">
                <button
                    onClick={() => setActive("before")}
                    className={`flex-1 py-3 px-4 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                        active === "before"
                            ? "bg-white/15 text-white border border-white/30"
                            : "text-white/40 border border-white/10 hover:border-white/20 hover:text-white/70"
                    }`}
                >
                    ▶ {beforeLabel}
                </button>
                <button
                    onClick={() => setActive("after")}
                    className={`flex-1 py-3 px-4 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                        active === "after"
                            ? "bg-[#e44c65] text-white border border-[#e44c65] shadow-[0_0_20px_rgba(228,76,101,0.35)]"
                            : "text-white/40 border border-white/10 hover:border-white/20 hover:text-white/70"
                    }`}
                >
                    ▶ {afterLabel}
                </button>
            </div>
            {/* Waveform placeholder */}
            <div className="h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center gap-1 px-4 border border-white/5">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                            active === "after" ? "bg-[#e44c65]" : "bg-white/30"
                        }`}
                        style={{
                            width: 3,
                            height: `${Math.random() * 65 + 15}%`,
                            opacity: 0.6 + Math.random() * 0.4,
                        }}
                    />
                ))}
            </div>
            <p className="text-white/30 text-xs text-center italic tracking-wider">
                Demo-Audio — demnächst verfügbar
            </p>
        </div>
    );
}

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({
    name,
    price,
    description,
    features,
    highlighted = false,
}: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
}) {
    return (
        <div
            className={`relative flex flex-col rounded-3xl p-8 sm:p-10 border transition-all duration-300 hover:scale-[1.01] ${
                highlighted
                    ? "bg-[#e44c65]/[0.08] border-[#e44c65]/50 shadow-[0_0_50px_rgba(228,76,101,0.18)]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
            }`}
        >
            {highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e44c65] text-white text-[11px] font-medium px-4 py-1.5 rounded-full tracking-[0.22em] uppercase shadow-[0_0_20px_rgba(228,76,101,0.4)]">
                    ⭐ Beliebt
                </div>
            )}
            <div className="mb-6">
                <p className="text-white/40 text-xs font-medium uppercase tracking-[0.24em] mb-3">{name}</p>
                <p className="text-4xl sm:text-5xl font-light text-white tracking-wider">{price}</p>
            </div>
            <p className="text-white/70 text-sm font-light leading-relaxed min-h-[4rem] mb-8">{description}</p>
            <ul className="space-y-3.5 flex-1 mb-8">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80 font-light">
                        <span className={`mt-0.5 text-base flex-shrink-0 ${highlighted ? "text-[#e44c65]" : "text-white/40"}`}>✓</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <a
                href="mailto:recording@santinoscavelli.de"
                className={`block text-center py-4 rounded-full font-medium text-xs sm:text-sm uppercase tracking-[0.16em] transition-all hover:scale-105 ${
                    highlighted
                        ? "bg-[#e44c65] text-white hover:bg-[#c43c52] shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                }`}
            >
                Jetzt buchen →
            </a>
        </div>
    );
}

// ─── Hero Slideshow images ──────────────────────────────────────────────────
const heroImages = [
    { src: "/images/ganzstudio.jpg", alt: "DrumHub – Studio Gesamtansicht" },
    { src: "/images/Splitset GB Studio.JPG", alt: "DrumHub – Hybrides Split-Set" },
    { src: "/images/Mikrofon GB Studio.JPG", alt: "DrumHub – Mikrofone" },
    { src: "/images/Preamp.JPG", alt: "DrumHub – Preamps & Outboard" },
    { src: "/images/Drumset GB Studio.JPG", alt: "DrumHub – Recording Drumset" },
    { src: "/images/p1142933.jpg", alt: "DrumHub – Studio Session" },
];

// ─── Studio Carousel Gallery ──────────────────────────────────────────────────
const studioGallery = [
    {
        src: "/images/ganzstudio.jpg",
        alt: "DrumHub Studio Gesamtansicht",
        label: "Studio Gesamtansicht",
        category: "Raum & Akustik",
        details: "Akustisch optimierter Aufnahmeraum in Mannheim mit flexibler Mikrofonierung für akustische und hybride Drums.",
    },
    {
        src: "/images/Splitset GB Studio.JPG",
        alt: "Hybrides Split-Set",
        label: "Hybrides Split-Set",
        category: "Signature Instrument",
        details: "Santinos eigens entwickeltes Hybrid-Setup aus Darbuka, Frame Drums, Drumkit und Synthesizern.",
    },
    {
        src: "/images/Mikrofon GB Studio.JPG",
        alt: "Mikrofon-Array",
        label: "Mikrofon-Array",
        category: "Audix & Shure",
        details: "Audix Studio Elite 8, Microtech Gefell M 930 und abgestimmte Overheads für maximalen Detailreichtum.",
    },
    {
        src: "/images/Preamp.JPG",
        alt: "Preamps & Outboard Rack",
        label: "Preamps & Outboard",
        category: "SPL & Warm Audio",
        details: "SPL GoldMike MK2 Röhrenpreamps, Warm Audio Neve- und API-Clones für analogen Punch und Wärme.",
    },
    {
        src: "/images/Drumset GB Studio.JPG",
        alt: "Recording Drumset",
        label: "Master Drumset",
        category: "Custom Drumkit",
        details: "Präzise gestimmtes Set mit Evans Fellen und Meinl Cymbals für jeden musikalischen Stil.",
    },
    {
        src: "/images/Splitset Close GB Studio.JPG",
        alt: "Split-Set Detailaufnahme",
        label: "Split-Set Detail",
        category: "Percussion & Trigger",
        details: "Nahtlose Verbindung von Handpercussion, akustischen Kesseln und elektronischen Sound-Modulen.",
    },
    {
        src: "/images/eingang.jpg",
        alt: "DrumHub Eingang & Lounge",
        label: "Studio Eingang",
        category: "Atmosphäre",
        details: "Professionelles Studio-Ambiente für konzentriertes Arbeiten und kreativen Austausch.",
    },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RecordingPage() {
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen font-sans text-white bg-[#0f0f14]">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 1: HERO                                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Slideshow */}
                <div className="absolute inset-0">
                    {heroImages.map((img, i) => (
                        <div
                            key={img.src}
                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                            style={{ opacity: i === heroIndex ? 1 : 0 }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover object-center"
                                priority={i === 0}
                                quality={90}
                            />
                        </div>
                    ))}
                    {/* Dark overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0f0f14] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/80 to-transparent z-10 pointer-events-none" />

                    {/* Slide indicator dots */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {heroImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroIndex(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === heroIndex
                                        ? "w-7 h-2 bg-[#e44c65]"
                                        : "w-2 h-2 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.16em] text-white mb-6 uppercase leading-[1.08]">
                        Remote Recording<br />
                        <span className="text-[#e44c65]">Drums &amp; Percussion</span>
                    </h1>
                    <a
                        href="https://drumhub.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs sm:text-sm uppercase tracking-[0.32em] text-white/60 hover:text-white transition-colors font-medium mb-12"
                    >
                        DrumHub.de
                    </a>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Jetzt anfragen
                        </a>
                        <a
                            href="https://www.youtube.com/embed/UXlT_bLah-o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 sm:px-10 py-4 bg-white/5 text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            ▶ Demo anhören
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
                    <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 2: BIO / KURZVORSTELLUNG                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/images/pic01.jpg"
                            alt="Santino Scavelli im DrumHub Studio"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <p className="text-white font-normal uppercase tracking-[0.14em] text-base sm:text-lg">DrumHub Studio</p>
                            <p className="text-white/50 text-xs sm:text-sm font-light tracking-wider">Mannheim, Deutschland</p>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                                Über das Studio
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white leading-tight mb-8">
                                Hi, ich bin Santino.
                            </h2>
                            <div className="space-y-5 text-white/75 text-base sm:text-lg font-light leading-relaxed">
                                <p>
                                    Hybrid Drummer, Meinl Artist und Musical Director am{" "}
                                    <span className="text-white font-medium">
                                        Nationaltheater Mannheim.
                                    </span>
                                </p>
                                <p>
                                    In meinem Studio <span className="text-white font-medium">DrumHub</span> nehme
                                    ich Drums, Percussion und mein eigens entwickeltes{" "}
                                    <span className="text-[#e44c65] font-medium">Split-Set</span> für
                                    deine Produktion auf. 6K Multi-Cam Video, 32 diskrete Spuren, alles remote –
                                    du schickst mir deinen Track, ich liefere dir den perfekten Rhythmus.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {[
                                { number: "32", label: "Spuren" },
                                { number: "6K", label: "Multi-Cam" },
                                { number: "10+", label: "Alben" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center"
                                >
                                    <p className="text-3xl sm:text-4xl font-light text-[#e44c65] tracking-wider">{s.number}</p>
                                    <p className="text-white/50 text-xs uppercase tracking-[0.2em] mt-1.5 font-light">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Sessions */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <p className="text-white/40 text-xs uppercase tracking-[0.24em] font-medium mb-4">
                                Bisherige Sessions &amp; Produktionen
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    "Elif",
                                    "Anika Nilles",
                                    "Mother's Cake",
                                    "Pulse Project",
                                    "Viktor",
                                    "Meinl Percussion",
                                    "Nationaltheater Mannheim",
                                ].map((name) => (
                                    <span
                                        key={name}
                                        className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-light text-white/80 tracking-wider"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 3: AUDIO PLAYER & DEMOS                                */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Vorher / Nachher
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            So klingt das.
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Höre den direkten Unterschied zwischen rohen Layout-Tracks und voll ausproduzierten Drum- und Percussion-Layern.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        <BeforeAfterPlayer
                            label="Percussion"
                            beforeLabel="Ohne Percussion"
                            afterLabel="Mit Percussion"
                        />
                        <BeforeAfterPlayer
                            label="Drums"
                            beforeLabel="Ohne Drums"
                            afterLabel="Mit Drums"
                        />
                        <BeforeAfterPlayer
                            label="Split-Set"
                            beforeLabel="Ohne Split-Set"
                            afterLabel="Mit Split-Set"
                        />
                    </div>

                    {/* YouTube Demos */}
                    <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/UXlT_bLah-o"
                                title="Recording Demo 1"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/oiPEmAeXYCY"
                                title="Recording Demo 2"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 4: PAKETE                                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Preise &amp; Pakete
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Pakete
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Klare Preise, transparente Kommunikation und erstklassige Aufnahmen im DrumHub Studio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <PackageCard
                            name="Percussion Essentials"
                            price="200€"
                            description="Shaker, Tamburin, Congas oder Handclaps – genau die organischen Akzente, die deinem Song den Groove geben."
                            features={[
                                "Bis 2 Instrumente",
                                "Stereo Mix + Einzelspuren",
                                "2 Revisionen inklusive",
                                "Lieferung: 3–5 Tage",
                            ]}
                        />
                        <PackageCard
                            name="Percussion World"
                            price="450€"
                            description="Darbuka, Frame Drums, Cajón, Bongos und mehr – facettenreiches Handpercussion-Arrangement für Tiefe und Dynamik."
                            features={[
                                "Bis 5 Instrumente",
                                "Multitrack (32 Bit) + Stereo Mix",
                                "3 Revisionen inklusive",
                                "Lieferung: 5–7 Tage",
                            ]}
                            highlighted
                        />
                        <PackageCard
                            name="Hybrid Session"
                            price="950€"
                            description="Drums + Percussion + Electronics aus einem Guss. Mein innovatives Split-Set maßgeschneidert für deinen Track."
                            features={[
                                "Alle Instrumente & Synths",
                                "Vollständige Multitrack-Stems",
                                "Unbegrenzte Revisionen",
                                "Lieferung: 7–10 Tage",
                            ]}
                        />
                    </div>

                    {/* Add-ons */}
                    <div className="mt-16 bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                        <h3 className="text-white font-normal uppercase tracking-[0.16em] text-lg sm:text-xl mb-8 text-center">
                            Optionale Add‑ons
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: "6K Multi-Cam Video deiner Session", price: "+300€" },
                                { label: "Detailliertes Editing & Pre-Mix", price: "+150€" },
                                { label: "Express-Lieferung (innerhalb 48h)", price: "+50%" },
                            ].map((a) => (
                                <div
                                    key={a.label}
                                    className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4"
                                >
                                    <span className="text-white/75 text-sm font-light">{a.label}</span>
                                    <span className="text-[#e44c65] font-medium text-sm tracking-wider">{a.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 5: DAS STUDIO (HERVORGEHOBEN & NACH OBEN GEZOGEN)       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Equipment &amp; Raum
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Das Studio
                        </h2>
                        <p className="text-white/50 mt-4 text-base sm:text-lg font-light">
                            DrumHub Mannheim · Akustisch optimiert für Drums, Percussion &amp; Hybrid-Setups
                        </p>
                    </div>

                    {/* Studio Carousel */}
                    <div className="mb-12 sm:mb-16">
                        <GalleryCarousel images={studioGallery} />
                    </div>

                    {/* Link direkt zu drumhub.de */}
                    <div className="text-center">
                        <a
                            href="https://drumhub.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] bg-white/5 border border-white/15 hover:border-white/40 hover:bg-white/10 px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg backdrop-blur-sm"
                        >
                            Mehr Einblicke &amp; Studio mieten → drumhub.de
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 6: FINALER CTA                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e44c65]/15 via-[#0f0f14] to-[#0f0f14]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#e44c65]/10 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Kontakt
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-light tracking-[0.16em] text-white mb-6 uppercase leading-tight">
                        Bereit für deinen Track?
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed font-light max-w-xl mx-auto">
                        Schick mir dein Demomaterial und ich sage dir welches Setup am besten passt.
                        <br />
                        <span className="text-white/90 font-normal">
                            Antwort garantiert innerhalb von 24 Stunden.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_35px_rgba(228,76,101,0.4)]"
                        >
                            recording@santinoscavelli.de
                        </a>
                        <a
                            href="https://soundbetter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 sm:px-10 py-4 bg-white/5 text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            SoundBetter →
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
