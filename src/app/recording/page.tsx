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
            {/* SEKTION 1: HERO                                               */}
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
                        Das akustische und visuelle Klanglabor im <span className="text-white font-medium">DrumHub Studio</span>. 
                        Über 100 Instrumente, 4 Tama Drumsets, 16 Master-Snares, World Percussion, analoge Synthesizer und bis zu 8 Kameras synchron in 6K.
                    </p>

                    {/* Quick Highlights Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto mb-10 text-xs text-white/70 font-light tracking-wider">
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">32 diskrete Spuren</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">SPL Röhren-Preamps</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Multi-Perkussion</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Sequential Prophet-6</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Bis zu 8 Kameras in 6K</span>
                        <span className="px-3 py-1.5 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/40 text-[#e44c65]">Vor Ort &amp; Remote weltweit</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de?subject=Recording%20Anfrage"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Session anfragen →
                        </a>
                        <a
                            href="#klangwelten"
                            className="px-8 sm:px-10 py-4 bg-white/5 text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            Möglichkeiten &amp; Sound-Referenzen
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
            {/* SEKTION 2: ÜBER SANTINO & DAS STUDIO                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Image with Studio Branding */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                        <Image
                            src="/images/pic01.jpg"
                            alt="Santino Scavelli im DrumHub Studio Mannheim"
                            fill
                            className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium uppercase tracking-[0.14em] text-base sm:text-lg">Santino Scavelli</p>
                                <p className="text-white/60 text-xs sm:text-sm font-light tracking-wider">Multi-Perkussionist · Drummer · Sound Designer</p>
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
                                Die musikalische Vision
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.12em] text-white leading-tight mb-6">
                                Rhythmen mit Seele. Aus einem echten Labor.
                            </h2>
                            <div className="space-y-4 text-white/75 text-base sm:text-lg font-light leading-relaxed">
                                <p>
                                    Als <strong className="text-white font-medium">Multi-Perkussionist, Schlagzeuger und Meinl Artist</strong> verbinde ich organische Rhythmen verschiedener Musikkulturen mit modernster Klangsynthese und kraftvollem Drumset-Groove.
                                </p>
                                <p>
                                    In meinem Studio <strong className="text-white font-medium">DrumHub Mannheim</strong> nehme ich nicht einfach nur Spuren auf: Wir kuratieren den exakt richtigen Kesselsound, die passende Snare-Legierung und organische Handpercussion, die deinem Track Tiefe, Haptik und eine unverkennbare Handschrift verleihen.
                                </p>
                                <p className="text-sm text-white/60 italic border-l-2 border-[#e44c65] pl-4 py-1">
                                    „Schluss mit sterilen Konserven-Loops. Echte Instrumente, analoge Röhrenwärme und dynamische Spielkultur heben Songs in eine ganz andere Liga.“
                                </p>
                            </div>
                        </div>

                        {/* Quick Studio Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-[#e44c65] tracking-wider">100+</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">Instrumente</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-white tracking-wider">32</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">Spuren Diskret</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                                <p className="text-2xl sm:text-3xl font-light text-[#e44c65] tracking-wider">6K</p>
                                <p className="text-white/50 text-[11px] uppercase tracking-[0.18em] mt-1 font-light">8 Kameras Multi-Cam</p>
                            </div>
                        </div>

                        {/* Selected Collaborations */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6">
                            <p className="text-white/40 text-xs uppercase tracking-[0.22em] font-medium mb-3">
                                Sessions, Artists &amp; Produktionen
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
            {/* SEKTION 3: DIE 4 KLANGWELTEN MIT HIT-REFERENZEN                */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section id="klangwelten" className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Die Studio-Möglichkeiten
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-[0.14em] text-white">
                            4 Klangwelten. Dein Sound.
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Jeder Song braucht eine eigene klangliche Sprache. Hier siehst du, welche Instrumente und berühmten Sound-Ästhetiken wir für deine Produktion realisieren.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* ─── WELT 1: WORLD & ETHNIC PERCUSSION ────────────────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        01 · Organischer Puls
                                    </span>
                                    <Globe className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    World &amp; Ethnic Percussion
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    Kulturen verbinden · Naturfelle &amp; handgehämmerte Metalle
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    Organische Dreidimensionalität statt starrer Loops: Handgespielte Rahmentrommeln, orientalische Darbukas, afro-kubanische Congas und die meditative Handpan bringen lebendige Ghostnotes, feine Akzente und authentischen Groove in deinen Track.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Spielbereit im Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Meinl Sonic Energy Handpan (D-Kurd)</li>
                                        <li className="flex items-center gap-2">✓ Rahmentrommeln: Tar, Bendir, Riq, Mizhar</li>
                                        <li className="flex items-center gap-2">✓ Handgehämmerte Darbukas &amp; Djembe</li>
                                        <li className="flex items-center gap-2">✓ Meinl Artist Congas, Bongos, Cajón &amp; Udu</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Klangbild &amp; Hit-Referenzen:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Sting feat. Cheb Mami – „Desert Rose“:</strong> Treibende Darbuka- &amp; Rahmentrommel-Grooves mit arabischen Mikro-Artikulationen.
                                        </li>
                                        <li>
                                            <strong className="text-white">Hans Zimmer – „Dune“ &amp; „Gladiator“:</strong> Monumentale Frame-Drum-Pulse, archaische Shaker und cineastische Naturton-Tiefe.
                                        </li>
                                        <li>
                                            <strong className="text-white">Rosalía – „Malamente“ / „Motomami“ &amp; Peter Gabriel:</strong> Mediterrane Handclaps &amp; traditionelle Percussion im modernen Pop-Gewand.
                                        </li>
                                        <li>
                                            <strong className="text-white">Santana – „Smooth“:</strong> Lebendige Conga-Fills, Shaker-Clouds und fließende Polyrhythmik.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Anfrage%20World%20Percussion"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Percussion-Session für deinen Track anfragen</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── WELT 2: AKUSTISCHE DRUMS & 16 MASTER-SNARES ─────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        02 · Akustisches Fundament
                                    </span>
                                    <Music2 className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    Akustische Drums &amp; 16 Snares
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    4 Tama Kessel-Welten · Finde deinen perfekten Backbeat
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    Vom trockenen 70s-Funk bis zum monumentalen 24"-Rockdonner. Vier präzise gestimmte Tama Drumsets und 16 handverlesene Master-Snares stehen mikrofoniert bereit – für genau den Snare-Attack und Kessel-Punch, den dein Song verlangt.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Spielbereit im Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Tama STAR Maple (18×14" Jazz &amp; Funk)</li>
                                        <li className="flex items-center gap-2">✓ Tama Rockstar (20×16" Trockener Pop-Punch)</li>
                                        <li className="flex items-center gap-2">✓ Tama Starclassic Performer (22×18" Allrounder)</li>
                                        <li className="flex items-center gap-2">✓ Tama Starclassic Maple (24×20" Rock &amp; Cinema)</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ 16 Snares: Alu, Glockenbronze, Wood Hoops, 80s Superstar</li>
                                        <li className="flex items-center gap-2 col-span-full text-[#e44c65]">★ Geheimwaffe: DIY Focal Polyflex Subkick (30–60 Hz Bässe)</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Klangbild &amp; Hit-Referenzen:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Silk Sonic – „Leave The Door Open“ &amp; Daft Punk – „Get Lucky“:</strong> Trockener, extrem fokussierter 70s-Funk-Snare-Sound mit Wood Hoops und saubersten Ghostnotes.
                                        </li>
                                        <li>
                                            <strong className="text-white">Phil Collins – „In The Air Tonight“ &amp; Tame Impala:</strong> Riesige, dynamische Kesselresonanzen mit analoger Röhrensättigung.
                                        </li>
                                        <li>
                                            <strong className="text-white">Foo Fighters &amp; Led Zeppelin:</strong> Wuchtiges 24"-Kesselgrollen und schmetternde Bronze-Rimshots, die mühelos durch dichte Gitarrenwände schneiden.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Anfrage%20Drumset%20Recording"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Drumset-Session für deinen Track anfragen</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── WELT 3: ANALOG-SYNTHS, HYBRID & SPLIT-SET ───────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        03 · Hybrid &amp; Synthese
                                    </span>
                                    <Sliders className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    Synths, Hybrid &amp; Split-Set
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    Santinos Signature Setup · Analoge Subbässe &amp; AI-Triggers
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    Die nahtlose Verschmelzung von akustischem Handspiel und zupackender elektronischer Klangsynthese. Santinos eigens entwickeltes Split-Set verbindet echte Drums mit modularen Synthesizern, Subbässen und multidimensionalen AI-Sensoren.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Spielbereit im Studio:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ Santino Scavelli Signature Split-Set</li>
                                        <li className="flex items-center gap-2">✓ Sequential Prophet-6 (Echter Polyphon-Analog)</li>
                                        <li className="flex items-center gap-2">✓ Behringer Model D (Minimoog-Subbässe)</li>
                                        <li className="flex items-center gap-2">✓ Nord Drum 3P Synthesizer &amp; Roland TD-3 Acid</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Evans Sensory Percussion (Multi-Zonen AI Dynamic Tracking)</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ High-End Pedale: Empress Reverb, Delays &amp; Moog Filter</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Disc size={14} />
                                        <span>Klangbild &amp; Hit-Referenzen:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">The Weeknd – „Blinding Lights“ &amp; Dua Lipa:</strong> Schiebende analoge 80s-Synthbässe gepaart mit schneidendem, modernen Drum-Attack.
                                        </li>
                                        <li>
                                            <strong className="text-white">Billie Eilish &amp; FINNEAS – „Bad Guy“:</strong> Tiefste 30–50 Hz Subbass-Impulse aus dem Model D und ungeschliffene perkussive Transienten.
                                        </li>
                                        <li>
                                            <strong className="text-white">Jon Hopkins, Moderat &amp; Stephan Bodzin:</strong> Hypnotische Polyrhythmik, modulare Synthesizer-Schichten und raue Texturen.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Anfrage%20Hybrid%20%26%20Sound%20Design"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Hybrid- &amp; Sound-Design Session anfragen</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                        {/* ─── WELT 4: HIGH-END AUDIO & 6K MULTI-CAM LAB ────────────── */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#e44c65]/40 transition-all duration-300 group">
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="px-3.5 py-1 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-semibold">
                                        04 · Visual &amp; Tonstudio
                                    </span>
                                    <Video className="text-white/40 group-hover:text-[#e44c65] transition-colors" size={24} />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-2">
                                    High-End Audio &amp; 6K Multi-Cam
                                </h3>
                                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium mb-4">
                                    32 diskrete Mehrspuren · Bis zu 8 Kameras gleichzeitig
                                </p>
                                <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed mb-6">
                                    Echtes Studio-Handwerk auf Kinoniveau. Reine diskrete Signalwege mit Röhren-Wärme für den Sound – kombiniert mit bis zu 8 synchronen Kameras für atemberaubendes Video-Footage deiner Studiosession für Social Media, YouTube und Release-Kampagnen.
                                </p>

                                {/* Ready in Studio */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-3">
                                        Studio-Setup &amp; Kameras:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                                        <li className="flex items-center gap-2">✓ 32 diskrete latenzfreie Wandler-Kanäle</li>
                                        <li className="flex items-center gap-2">✓ SPL GoldMike MK2 diskrete Röhrenpreamps</li>
                                        <li className="flex items-center gap-2">✓ Warm Audio Neve- &amp; API-Clones</li>
                                        <li className="flex items-center gap-2">✓ Audix Studio Elite 8 &amp; Microtech Gefell M 930</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Bis zu 8 Kameras gleichzeitig synchron: Panasonic Lumix S1 (6K V-Log), GH5, G9</li>
                                        <li className="flex items-center gap-2 col-span-full">✓ Motorisierte GVM Slider (120 cm &amp; 60 cm) &amp; Studio-Lichtregie</li>
                                    </ul>
                                </div>

                                {/* Hit & Sound References */}
                                <div className="border-t border-white/10 pt-5 space-y-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#e44c65] font-semibold flex items-center gap-2">
                                        <Film size={14} />
                                        <span>Klangbild &amp; Video-Referenzen:</span>
                                    </p>
                                    <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                                        <li>
                                            <strong className="text-white">Ludwig Göransson – „Oppenheimer“ &amp; „Tenet“:</strong> Nervenkitzelnde rhythmische Ostinati, massive Dynamik und detailreichste Raummikrofonierung auf 32 Spuren.
                                        </li>
                                        <li>
                                            <strong className="text-white">Tiny Desk Concerts &amp; ColorsxStudios:</strong> Intime, kristallklare Bildästhetik mit flüssigen Slider-Fahrten, wo man jede Handbewegung und jede Nuance am Fell spürt.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="mailto:recording@santinoscavelli.de?subject=Anfrage%20Audio%20%26%20Video%20Session"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#e44c65] hover:text-white font-medium transition-colors"
                                >
                                    <span>Multi-Cam &amp; Recording Session anfragen</span>
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 4: STUDIO SHOWCASE (ECHTE VIDEOS)                     */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Session Einblicke
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            So klingt &amp; sieht das aus.
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Live eingespielt im DrumHub Studio Mannheim. Schau dir die Studio-Sessions und Multi-Cam Perspektiven an.
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
            {/* SEKTION 5: DAS STUDIO & GALERIE                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Blick ins Labor
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            DrumHub Studio
                        </h2>
                        <p className="text-white/60 mt-4 text-base sm:text-lg font-light max-w-xl mx-auto">
                            Mannheim · Akustisch optimiert für Drums, Percussion, analoge Synthesizer &amp; 6K Multi-Cam
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
                            <span>Komplettes Studio-Setup &amp; Sound-Magazin erkunden → drumhub.de</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 6: WORKFLOW (WIE WIR ZUSAMMENARBEITEN)                 */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-32 px-6 border-b border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4">
                            Der Ablauf
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Von der Idee zu mix-fertigen Spuren
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mt-4">
                            Egal ob du vor Ort im Studio in Mannheim bist oder mir deine Tracks aus der Ferne schickst – so entsteht deine Session:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">01</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Vision &amp; Stems</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Du sendest mir dein Demomaterial, Audio-Stems oder Noten und beschreibst deine gewünschte Klangästhetik und Energie.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">02</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Sound-Kuration</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Ich wähle aus über 100 Instrumenten, 4 Drumkits, 16 Snares und Synthesizern das ideale klangliche Setup für deinen Song aus.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">03</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Recording &amp; Video</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Aufnahme auf bis zu 32 diskreten Röhrenspuren im DrumHub Studio – auf Wunsch synchron mit bis zu 8 Kameras in 6K.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative">
                            <span className="text-3xl font-light text-[#e44c65] block mb-4">04</span>
                            <h4 className="text-lg font-medium text-white mb-2 uppercase tracking-wider">Delivery</h4>
                            <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                                Du erhältst alle Spuren unkomprimiert (WAV 24/32 Bit, 48/96 kHz) sauber editiert und phasenlinear – sofort mix-ready für deine DAW.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 7: FINALER CTA & KONTAKT                              */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e44c65]/15 via-[#0f0f14] to-[#0f0f14]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#e44c65]/10 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Individuelle Projektanfrage
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-light tracking-[0.14em] text-white mb-6 uppercase leading-tight">
                        Lass uns deinen Sound finden.
                    </h2>
                    <p className="text-base sm:text-lg text-white/75 mb-10 leading-relaxed font-light max-w-xl mx-auto">
                        Jede Musikproduktion ist anders. Erzähl mir von deinem Song oder Projekt – ich sage dir, welche Instrumente und Mikrofonierungen am besten klingen.
                        <br />
                        <span className="text-white font-normal block mt-2">
                            Antwort garantiert innerhalb von 24 Stunden.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:recording@santinoscavelli.de?subject=Projektanfrage%20Recording"
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
                            DrumHub.de besuchen ↗
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
