"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { 
    Sparkles, 
    Video, 
    Mic2, 
    Layers, 
    Music2, 
    Sliders, 
    ArrowRight, 
    Film, 
    Globe, 
    Disc, 
    Check,
    Volume2,
    Headphones,
    Radio
} from "lucide-react";

// ─── Hero Slideshow Images ──────────────────────────────────────────────────
const heroImages = [
    { src: "/images/ganzstudio.jpg", alt: "DrumHub – Studio Overview" },
    { src: "/images/Splitset GB Studio.JPG", alt: "DrumHub – Hybrid Split-Set" },
    { src: "/images/Mikrofon GB Studio.JPG", alt: "DrumHub – Microphones" },
    { src: "/images/Preamp.JPG", alt: "DrumHub – Preamps & Outboard" },
    { src: "/images/Drumset GB Studio.JPG", alt: "DrumHub – Recording Drumset" },
    { src: "/images/p1142933.jpg", alt: "DrumHub – Studio Session" },
];

// ─── Studio Carousel Gallery ──────────────────────────────────────────────────
const studioGallery = [
    {
        src: "/images/ganzstudio.jpg",
        alt: "DrumHub Studio Overview",
        label: "Studio Overview",
        category: "Room & Acoustics",
        details: "Acoustically tuned live room in Mannheim with versatile microphone arrays for acoustic and hybrid drums.",
    },
    {
        src: "/images/Splitset GB Studio.JPG",
        alt: "Hybrid Split-Set",
        label: "Hybrid Split-Set",
        category: "Signature Instrument",
        details: "Santino's custom-engineered hybrid setup merging Darbuka, Frame Drums, acoustic drums, and analog synthesizers.",
    },
    {
        src: "/images/Mikrofon GB Studio.JPG",
        alt: "Microphone Array",
        label: "Microphone Array",
        category: "Audix & Microtech Gefell",
        details: "Audix Studio Elite 8, Microtech Gefell M 930 and matched overheads for high-resolution transient response.",
    },
    {
        src: "/images/Preamp.JPG",
        alt: "Preamps & Outboard Rack",
        label: "Preamps & Outboard",
        category: "SPL & Warm Audio",
        details: "SPL GoldMike MK2 discrete tube preamps, Warm Audio Neve & API clones for analog punch and warm harmonics.",
    },
    {
        src: "/images/Drumset GB Studio.JPG",
        alt: "Master Drumset",
        label: "Master Drumset",
        category: "Custom Drumkit",
        details: "Precisely tuned kit with Evans heads and Meinl Byzance cymbals tailored for every musical style.",
    },
    {
        src: "/images/Splitset Close GB Studio.JPG",
        alt: "Split-Set Close-up",
        label: "Split-Set Detail",
        category: "Percussion & Triggers",
        details: "Seamless unity of world hand percussion, acoustic shells, and electronic sound synthesis.",
    },
    {
        src: "/images/eingang.jpg",
        alt: "DrumHub Entrance & Lounge",
        label: "Studio Entrance",
        category: "Atmosphere",
        details: "Professional studio atmosphere designed for focused production sessions and creative exchange.",
    },
];

export default function RecordingPage() {
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen font-sans text-white bg-[#0f0f14] selection:bg-[#e44c65] selection:text-white">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 1: HERO                                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
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
                    {/* Dark gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0f0f14] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/80 to-transparent z-10 pointer-events-none" />

                    {/* Slide indicator dots */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {heroImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroIndex(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === heroIndex
                                        ? "w-8 h-2 bg-[#e44c65]"
                                        : "w-2 h-2 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-24 sm:pt-28">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/15 text-[#e44c65] text-xs font-semibold uppercase tracking-[0.24em] mb-6 backdrop-blur-md">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>High-End Studio &amp; Recording · DrumHub Mannheim</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.14em] text-white mb-6 uppercase leading-[1.08]">
                        Drums · Percussion<br />
                        <span className="text-[#e44c65] font-normal">&amp; Sound Design</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                        The acoustic and visual sound lab at <span className="text-white font-medium">DrumHub Studio</span>. 
                        Over 100 instruments, 4 Tama drumkits, 16 master snares, world percussion, analog synthesis, and up to 8 synced cameras in 6K.
                    </p>

                    {/* Quick Highlights Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto mb-10 text-xs text-white/70 font-light tracking-wider">
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">32 Discrete Channels</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">SPL Tube Preamps</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Multi-Percussion</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Sequential Prophet-6</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Up to 8 Multi-Cam 6K</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/40 text-[#e44c65]">In-Studio &amp; Remote Worldwide</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de?subject=Recording%20Inquiry"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Inquire Session →
                        </a>
                        <a
                            href="#klangwelten"
                            className="px-8 sm:px-10 py-4 bg-white/5 text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            Sound Realms &amp; Hit References
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20">
                    <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
                    <span className="text-[11px] uppercase tracking-widest font-light">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 2: ABOUT SANTINO & THE STUDIO                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Image with Studio Branding */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                        <Image
                            src="/images/pic01.jpg"
                            alt="Santino Scavelli at DrumHub Studio Mannheim"
                            fill
                            className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium uppercase tracking-[0.14em] text-base sm:text-lg">Santino Scavelli</p>
                                <p className="text-white/60 text-xs sm:text-sm font-light tracking-wider">Multi-Percussionist · Drummer · Sound Designer</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 backdrop-blur-md">
                                DrumHub Mannheim
                            </span>
                        </div>
                    </div>

                    {/* Bio Text */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                                The Musical Vision
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.12em] text-white leading-tight mb-6">
                                Rhythms with Soul. Crafted in a Real Lab.
                            </h2>
                            <div className="space-y-4 text-white/75 text-base sm:text-lg font-light leading-relaxed">
                                <p>
                                    As a <strong className="text-white font-medium">multi-percussionist, touring drummer, and Meinl Artist</strong>, I merge organic rhythms across global cultures with cutting-edge sound synthesis and driving drumset grooves.
                                </p>
                                <p>
                                    At my studio <strong className="text-white font-medium">DrumHub Mannheim</strong>, we don't just track beats: We curate the exact shell timbre, the ideal snare metal alloy, and nuanced hand percussion that give your track three-dimensional depth, texture, and an unmistakable sonic signature.
                                </p>
                                <p className="text-sm text-white/60 italic border-l-2 border-[#e44c65] pl-4 py-1">
                                    “No more sterile canned sample loops. Real instruments, analog tube warmth, and dynamic human articulation elevate music into an entirely different realm.”
                                </p>
                            </div>
                        </div>

                        {/* Quick Studio Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-[#e44c65] tracking-wider">100+</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">Instruments</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-white tracking-wider">32</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">Discrete Channels</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-[#e44c65] tracking-wider">6K</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">8 Multi-Cam Park</p>
                            </div>
                        </div>

                        {/* Selected Collaborations */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6">
                            <p className="text-white/40 text-xs uppercase tracking-[0.22em] font-medium mb-3">
                                Sessions, Artists &amp; Productions
                            </p>
                            <div className="flex flex-wrap gap-2">
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
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-light text-white/80 tracking-wider"
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
            {/* SECTION 3: THE 4 SOUND REALMS WITH HIT REFERENCES             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="klangwelten" className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Studio Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-[0.14em] text-white">
                            4 Sound Realms. Your Signature.
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Every song speaks its own acoustic language. Explore the real instruments and iconic hit aesthetics we bring to life for your production.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* ─── REALM 1: WORLD & ETHNIC PERCUSSION ────────────────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        01 · Organic Pulse
                                    </span>
                                    <Globe className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    World &amp; Ethnic Percussion
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    Uniting Cultures · Natural Skin &amp; Hand-Hammered Metals
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    True three-dimensional spatial feel instead of stiff loops: Hand-played frame drums, Middle Eastern darbukas, Afro-Cuban congas, and meditative handpans provide living ghost notes, subtle accents, and rhythmic soul.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Ready in the Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Meinl Sonic Energy Handpan (D-Kurd stainless)</li>
                                        <li className="flex items-center gap-2">✓ Frame Drums: Tar, Bendir, Riq, Mizhar</li>
                                        <li className="flex items-center gap-2">✓ Hand-hammered Darbukas &amp; Djembe</li>
                                        <li className="flex items-center gap-2">✓ Meinl Artist Congas, Bongos, Cajón &amp; Udu</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Sonic Aesthetic &amp; Hit References:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Sting feat. Cheb Mami – “Desert Rose”:</strong> Driving darbuka and frame drum patterns with nuanced micro-articulations.
                                        </li>
                                        <li>
                                            <strong className="text-white">Hans Zimmer – “Dune” &amp; “Gladiator”:</strong> Monumental frame drum pulses, archaic shaker atmospheres, and cinematic depth.
                                        </li>
                                        <li>
                                            <strong className="text-white">Rosalía – “Malamente” / “Motomami” &amp; Peter Gabriel:</strong> Mediterranean claps &amp; world percussion integrated into modern pop.
                                        </li>
                                        <li>
                                            <strong className="text-white">Santana – “Smooth”:</strong> Vibrant conga fills, organic shakers, and flowing polyrhythms.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Inquiry%20World%20Percussion"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Inquire Percussion Session for your track</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── REALM 2: ACOUSTIC DRUMS & 16 MASTER SNARES ──────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        02 · Acoustic Foundation
                                    </span>
                                    <Music2 className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    Acoustic Drums &amp; 16 Snares
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    4 Tama Shell Configurations · Find Your Perfect Backbeat
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    From tight, dry 70s funk to a 24" arena rock wall. Four precisely tuned Tama drumkits and 16 hand-selected master snares stand miked and ready – matching the exact punch and snare character your song demands.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Ready in the Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Tama STAR Maple (18×14" Jazz &amp; Acoustic)</li>
                                        <li className="flex items-center gap-2">✓ Tama Rockstar (20×16" Punchy Pop &amp; R&amp;B)</li>
                                        <li className="flex items-center gap-2">✓ Tama Starclassic Performer (22×18" All-round)</li>
                                        <li className="flex items-center gap-2">✓ Tama Starclassic Maple (24×20" Rock &amp; Cinema)</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ 16 Snares: Aluminum, Bell Bronze, Wood Hoops, 80s Superstar</li>
                                        <li className="flex items-center gap-2 col-span-full text-[#e44c65]">★ Secret Weapon: DIY Focal Polyflex Subkick (30–60 Hz sub frequencies)</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Sonic Aesthetic &amp; Hit References:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Silk Sonic – “Leave The Door Open” &amp; Daft Punk – “Get Lucky”:</strong> Dry, hyper-focused 70s funk snare backbeat with wood hoops and delicate ghost notes.
                                        </li>
                                        <li>
                                            <strong className="text-white">Phil Collins – “In The Air Tonight” &amp; Tame Impala:</strong> Massive shell body resonance coupled with analog tube saturation.
                                        </li>
                                        <li>
                                            <strong className="text-white">Foo Fighters &amp; Led Zeppelin:</strong> Deep 24" bass drum thunder and cutting bronze rimshots piercing through dense guitars.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Inquiry%20Drumset%20Recording"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Inquire Drumkit Session for your track</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── REALM 3: ANALOG SYNTHS, HYBRID & SPLIT-SET ──────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        03 · Hybrid &amp; Synthesis
                                    </span>
                                    <Sliders className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    Synths, Hybrid &amp; Split-Set
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    Santino's Signature Setup · Analog Sub-Basses &amp; AI Triggers
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    The seamless fusion of physical drum articulation and punchy analog synthesis. Santino's custom-developed Split-Set merges acoustic percussion with modular synthesizers, sub-basses, and multidimensional AI sensors.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Ready in the Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Santino Scavelli Signature Split-Set</li>
                                        <li className="flex items-center gap-2">✓ Sequential Prophet-6 (Pure Polyphonic Analog)</li>
                                        <li className="flex items-center gap-2">✓ Behringer Model D (Legendary Minimoog sub bass)</li>
                                        <li className="flex items-center gap-2">✓ Nord Drum 3P Synthesizer &amp; Roland TD-3 Acid</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Evans Sensory Percussion (Multi-Zone AI Dynamic Tracking)</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Boutique Pedals: Empress Reverb, delays &amp; analog filters</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Sonic Aesthetic &amp; Hit References:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">The Weeknd – “Blinding Lights” &amp; Dua Lipa:</strong> Driving vintage analog synth basses intertwined with cutting modern drum transient attacks.
                                        </li>
                                        <li>
                                            <strong className="text-white">Billie Eilish &amp; FINNEAS – “Bad Guy”:</strong> Deep 30–50 Hz sub-bass impulses from the Model D and raw acoustic clicks.
                                        </li>
                                        <li>
                                            <strong className="text-white">Jon Hopkins, Moderat &amp; Stephan Bodzin:</strong> Hypnotic polyrhythms, modular synthesizer layers, and gritty textures.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Inquiry%20Hybrid%20%26%20Sound%20Design"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Inquire Hybrid &amp; Sound Design Session</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── REALM 4: HIGH-END AUDIO & 6K MULTI-CAM LAB ────────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        04 · Visual &amp; Sound Lab
                                    </span>
                                    <Video className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    High-End Audio &amp; 6K Multi-Cam
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    32 Discrete Channels · Up to 8 Cameras Simultaneously
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    Studio craftsmanship on cinema-grade level. Discrete signal chains with tube warmth for audio – matched with up to 8 synchronous camera angles for stunning session videos for YouTube, social media, and release campaigns.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Studio Equipment &amp; Cameras:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ 32 discrete latency-free conversion channels</li>
                                        <li className="flex items-center gap-2">✓ SPL GoldMike MK2 discrete tube preamplifiers</li>
                                        <li className="flex items-center gap-2">✓ Warm Audio Neve &amp; API analog clones</li>
                                        <li className="flex items-center gap-2">✓ Audix Studio Elite 8 &amp; Microtech Gefell M 930</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Up to 8 synced cameras: Panasonic Lumix S1 (6K V-Log), GH5, G9</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Motorized GVM sliders (120 cm &amp; 60 cm) &amp; studio lighting control</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Film size={14} />
                                        <span>Sonic Aesthetic &amp; Video References:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Ludwig Göransson – “Oppenheimer” &amp; “Tenet”:</strong> Tense rhythmic ostinatos, massive dynamic swings, and pristine room miking across 32 tracks.
                                        </li>
                                        <li>
                                            <strong className="text-white">Tiny Desk Concerts &amp; ColorsxStudios:</strong> Intimate, film-grade visual aesthetic with smooth slider motions capturing every finger and shell detail.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Inquiry%20Audio%20%26%20Video%20Session"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Inquire Multi-Cam &amp; Recording Session</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 4: STUDIO SHOWCASE (REAL VIDEOS)                      */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Session Insights
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Listen &amp; Watch in Action.
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Recorded live at DrumHub Studio Mannheim. Watch session insights and multi-cam perspectives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/UXlT_bLah-o"
                                title="Santino Scavelli – DrumHub Studio Session 1"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/oiPEmAeXYCY"
                                title="Santino Scavelli – DrumHub Studio Session 2"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 5: THE STUDIO & GALLERY                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Inside the Lab
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            DrumHub Studio
                        </h2>
                        <p className="text-white/60 mt-4 text-base sm:text-lg font-light max-w-xl mx-auto">
                            Mannheim · Acoustically tuned for drums, percussion, analog synthesizers &amp; 6K multi-cam
                        </p>
                    </div>

                    {/* Studio Carousel */}
                    <div className="mb-12 sm:mb-16">
                        <GalleryCarousel images={studioGallery} />
                    </div>

                    {/* Link directly to drumhub.de */}
                    <div className="text-center">
                        <a
                            href="https://drumhub.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] bg-white/5 border border-white/15 hover:border-white/40 hover:bg-white/10 px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg backdrop-blur-sm"
                        >
                            <span>Explore Complete Studio Gear &amp; Sound Magazine → drumhub.de</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 6: WORKFLOW (HOW WE WORK TOGETHER)                     */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            The Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            From Vision to Mix-Ready Stems
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Whether you're visiting in person in Mannheim or sending your demo tracks remotely from anywhere in the world:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">01</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Vision &amp; Stems</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Send over your demo track, stems, or sheet music and describe the target energy and acoustic timbre you envision.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">02</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Sound Curation</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                I select the optimal sound configuration across 100+ instruments, 4 drumkits, 16 snares, and analog synths.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">03</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Recording &amp; Video</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Tracking up to 32 discrete analog tube channels at DrumHub Studio – optionally recorded in synced 6K multi-cam.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">04</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Delivery</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                You receive pristine, phase-aligned uncompressed multitrack audio (WAV 24/32 Bit, 48/96 kHz) ready for your mix.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 7: FINAL CTA & CONTACT                                */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e44c65]/15 via-[#0f0f14] to-[#0f0f14]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#e44c65]/10 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Custom Project Inquiry
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-light tracking-[0.14em] text-white mb-6 uppercase leading-tight">
                        Let's Find Your Sound.
                    </h2>
                    <p className="text-base sm:text-lg text-white/75 mb-10 leading-relaxed font-light max-w-xl mx-auto">
                        Every musical production is distinct. Tell me about your song or upcoming project – I'll outline the ideal instruments and miking setup.
                        <br />
                        <span className="text-white font-normal block mt-2">
                            Reply guaranteed within 24 hours.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de?subject=Project%20Inquiry%20Recording"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_35px_rgba(228,76,101,0.4)]"
                        >
                            recording@santinoscavelli.de
                        </a>
                        <a
                            href="https://drumhub.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 sm:px-10 py-4 bg-white/5 text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            Visit DrumHub.de ↗
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
