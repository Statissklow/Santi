"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Download, 
    Play, 
    Pause, 
    CheckCircle2, 
    Sparkles, 
    Sliders, 
    Layers, 
    ShieldCheck, 
    HelpCircle, 
    Music2, 
    ArrowRight,
    Headphones,
    FolderSync,
    HeartHandshake
} from "lucide-react";

interface DemoTrack {
    id: number;
    title: string;
    category: string;
    bpm: string;
    description: string;
    duration: string;
}

const demos: DemoTrack[] = [
    {
        id: 1,
        title: "01. Cinematic Ethnic Pulse",
        category: "Hybrid Groove",
        bpm: "110 BPM",
        description: "Meinl Darbuka & Frame Drum gelayert mit Nord Drum 3P Sub-Impulsen und Reverb Tails.",
        duration: "0:48",
    },
    {
        id: 2,
        title: "02. Deep Ambient Textures",
        category: "Atmospheres",
        bpm: "82 BPM",
        description: "Bowed Cymbals, Granular Shakers und organische Klangflächen für Tiefe und Immersion.",
        duration: "0:36",
    },
    {
        id: 3,
        title: "03. Modern Afro-Tribal Flow",
        category: "Acoustic & Ethnic",
        bpm: "122 BPM",
        description: "Tama Snare Rimshots, Meinl Byzance Becken und dynamische Riq-Fills mit lebendiger Mikro-Dynamik.",
        duration: "0:52",
    },
    {
        id: 4,
        title: "04. Electronic Nord Soundbed",
        category: "Modular & Synth",
        bpm: "95 BPM",
        description: "Frequenzmodulierte Percussion-Clicks, analoge Drum-Transienten und tiefe Sub-Drops.",
        duration: "0:41",
    },
];

export default function SamplePackPage() {
    // Lead Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Producer / Beatmaker");
    const [genre, setGenre] = useState("Electronic / Melodic Techno");
    const [daw, setDaw] = useState("Ableton Live");
    const [consent, setConsent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Audio Player Simulation State
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (index: number) => {
        if (currentTrackIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !email.includes("@")) {
            setError("Bitte gib eine gültige E-Mail-Adresse an.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/sample-pack-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    role,
                    genre,
                    daw,
                    packName: "SYNTHESIS",
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Etwas ist schiefgelaufen.");
            }

            setSubmitted(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Netzwerkfehler. Bitte versuche es später noch einmal.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-200 font-sans selection:bg-[#e44c65] selection:text-white">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#e44c65]/10 rounded-full blur-[140px]" />
                <div className="absolute top-3/4 right-10 w-[500px] h-[400px] bg-purple-900/10 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10">
                {/* ─── RIESIGES BAUSTELLENZEICHEN / COMING SOON HEADER ─── */}
                <section className="pt-32 sm:pt-36 pb-4 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-block p-6 sm:p-8 rounded-3xl bg-amber-500/[0.08] border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] backdrop-blur-xl">
                        <div className="text-7xl sm:text-8xl md:text-9xl select-none leading-none mb-4 filter drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                            🚧
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
                            <span>Baustelle · Under Construction</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase text-white mb-2">
                            Coming Soon
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
                            Das <strong className="text-white font-semibold">SYNTHESIS Sample Pack</strong> befindet sich aktuell in der Fertigstellung. Hör dir unten die ersten Audio-Demos an und trage dich ein, um beim Release sofort Bescheid zu wissen!
                        </p>
                    </div>
                </section>

                {/* ─── HERO SECTION ─────────────────────────────────────────── */}
                <section className="pt-10 pb-20 sm:pt-14 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left: Text & Pitch */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-[#e44c65] text-xs font-semibold uppercase tracking-[0.2em] shadow-lg">
                                <Sparkles size={14} className="animate-pulse" />
                                <span>Exklusiver Early Access · Limitiert gegen Feedback</span>
                            </div>

                            <div className="space-y-6 sm:space-y-7">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.16em] uppercase text-white leading-[1.1]">
                                    SYNTHESIS
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl text-white/85 font-light tracking-[0.14em] uppercase">
                                    Ambient &amp; Ethnic Drum Sample Pack
                                </p>
                                <p className="text-xs sm:text-sm text-[#e44c65] tracking-[0.22em] uppercase font-medium">
                                    The Rhythmic Canvas · Created by Santino Scavelli
                                </p>
                            </div>

                            <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                                Organisch. Ethnisch. Immersiv. Eine handverlesene Sammlung aus traditionellen Percussion-Instrumenten, handgespielten Drum-Elementen und futuristischer Klangsynthese. Entwickelt für Musikproduzenten, Sounddesigner und Komponisten, die Tiefe und Textur suchen.
                            </p>

                            {/* Key specs pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 pt-2">
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Qualität</div>
                                    <div className="text-sm font-semibold text-white mt-1">24-Bit / 48kHz</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Lizenz</div>
                                    <div className="text-sm font-semibold text-[#e44c65] mt-1">100% Royalty Free</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Hardware</div>
                                    <div className="text-sm font-semibold text-white mt-1">Nord Drum 3P</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Format</div>
                                    <div className="text-sm font-semibold text-white mt-1">Loops &amp; One-Shots</div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <a
                                    href="#download-form"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#e44c65] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_30px_rgba(228,76,101,0.4)] hover:shadow-[0_0_45px_rgba(228,76,101,0.7)] hover:bg-[#c43c52] transition-all text-center flex items-center justify-center gap-3 cursor-pointer"
                                >
                                    <Download size={18} />
                                    <span>Kostenlos gegen Feedback laden</span>
                                </a>
                                <a
                                    href="#demos"
                                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/15 text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Headphones size={18} className="text-[#e44c65]" />
                                    <span>Audio-Demos anhören</span>
                                </a>
                            </div>
                        </div>

                        {/* Right: 3D Box Mockup Artwork */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative group w-full max-w-[420px]">
                                {/* Back glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#e44c65]/30 to-purple-600/30 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
                                
                                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.03] shadow-2xl backdrop-blur-xl p-3 sm:p-4">
                                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/40">
                                        <Image
                                            src="/images/synthesis-sample-pack.jpg"
                                            alt="SYNTHESIS Sample Pack - Ambient & Ethnic Drum Sample Pack"
                                            fill
                                            priority
                                            className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="mt-4 px-2 flex items-center justify-between text-xs tracking-[0.16em] uppercase text-white/50">
                                        <span>Sample Library Vol. 1</span>
                                        <span className="text-[#e44c65] font-semibold">Immediate Download</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── AUDIO PREVIEWS SECTION ───────────────────────────────── */}
                <section id="demos" className="py-24 sm:py-32 bg-white/[0.015] border-y border-white/10 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                            <p className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                                Sound &amp; Texturen
                            </p>
                            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-white">
                                Hör rein in SYNTHESIS
                            </h2>
                            <p className="text-sm sm:text-base text-gray-400 font-light">
                                Alle Audiospuren wurden trocken aufgenommen und mit Highend-Preamps veredelt. Hier sind vier ausgewählte Demo-Kombinationen.
                            </p>
                        </div>

                        {/* Player Container */}
                        <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
                            {/* Track Selector list */}
                            <div className="space-y-4 mb-8">
                                {demos.map((demo, idx) => {
                                    const isCurrent = currentTrackIndex === idx;
                                    return (
                                        <div
                                            key={demo.id}
                                            onClick={() => togglePlay(idx)}
                                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                                                isCurrent
                                                    ? "bg-white/[0.07] border-[#e44c65]/60 shadow-[0_0_25px_rgba(228,76,101,0.15)]"
                                                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <button
                                                    type="button"
                                                    aria-label="Play/Pause"
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                                                        isCurrent && isPlaying
                                                            ? "bg-[#e44c65] text-white shadow-[0_0_15px_rgba(228,76,101,0.5)] scale-105"
                                                            : "bg-white/10 text-white hover:bg-white/20"
                                                    }`}
                                                >
                                                    {isCurrent && isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                                                </button>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2.5">
                                                        <h4 className="text-sm sm:text-base font-medium text-white truncate">
                                                            {demo.title}
                                                        </h4>
                                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#e44c65] font-semibold shrink-0">
                                                            {demo.bpm}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-light truncate mt-0.5">
                                                        {demo.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0 hidden sm:block">
                                                <span className="text-xs tracking-wider text-white/50 uppercase font-mono">
                                                    {demo.duration}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Simulated Waveform Display */}
                            <div className="bg-black/40 rounded-2xl p-6 border border-white/10 space-y-3">
                                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/60">
                                    <span className="flex items-center gap-2">
                                        <Music2 size={14} className="text-[#e44c65]" />
                                        <span>Aktueller Track: {demos[currentTrackIndex].title}</span>
                                    </span>
                                    <span className="font-mono text-[#e44c65]">
                                        {isPlaying ? "PLAYING" : "PAUSED"}
                                    </span>
                                </div>

                                <div className="h-20 flex items-center justify-center gap-1.5 px-2">
                                    {Array.from({ length: 48 }).map((_, i) => {
                                        const baseHeight = ((Math.sin(i * 0.4) + 1.2) * 30 + 15);
                                        const animHeight = isPlaying ? Math.min(100, baseHeight * (0.8 + Math.random() * 0.5)) : baseHeight * 0.4;
                                        return (
                                            <div
                                                key={i}
                                                className={`w-1 sm:w-1.5 rounded-full transition-all duration-200 ${
                                                    isPlaying
                                                        ? i % 4 === 0
                                                            ? "bg-[#e44c65]"
                                                            : "bg-white/70"
                                                        : "bg-white/20"
                                                }`}
                                                style={{ height: `${animHeight}%` }}
                                            />
                                        );
                                    })}
                                </div>
                                <p className="text-[11px] text-white/30 text-center tracking-widest uppercase">
                                    Preview Mode · 100% Original WAV-Aufnahmen aus Santinos Hybrid-Set
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── WHAT'S INSIDE ───────────────────────────────────────── */}
                <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                            Library Inhalt
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-white">
                            Was steckt in SYNTHESIS?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 font-light">
                            Vier sorgfältig kuratierte Klangwelten, die organische Percussion und analoge Synthese nahtlos verbinden.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Layers size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">01 · Tradition trifft Moderne</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Ethnic Percussion Stems
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Handgespielte Meinl Darbukas, Rahmentrommeln (Frame Drums), Djembes, Udu und Riq. Aufgenommen mit detailreichen Mikrofonierungen, um das echte Holz-, Fell- und Resonanzgefühl einzufangen.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Dynamische Ghost-Notes &amp; Slaps</li>
                                <li className="flex items-center gap-2">✓ Einzeltreffer (One-Shots) &amp; flexible Loops</li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Sliders size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">02 · Digital &amp; Analog</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Nord Drum 3P Synthesis
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Individuell programmierte Synthesizer-Sounds der legendären Nord Drum 3P. Sub-Drops, modulierte Klicks, futuristische Rim-Sounds und druckvolle elektronische Transienten.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Perfekt für Layering mit akustischen Kicks &amp; Snares</li>
                                <li className="flex items-center gap-2">✓ Ungeschliffene Punch-Transienten &amp; Bass-Impulse</li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Music2 size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">03 · Akustisches Fundament</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Acoustic Drum Elements
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Tama Starclassic Snares, knackige Hi-Hats und handverlesene Meinl Byzance Becken. Im Akustikraum von Santinos eigenem DrumHub Studio trocken und druckvoll aufgenommen.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Verschiedene Anschlagsdynamiken (Velocity Layers)</li>
                                <li className="flex items-center gap-2">✓ Mix-ready mit Röhrenwärme (SPL GoldMike MK2)</li>
                            </ul>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">04 · Filmisch &amp; Breit</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Ambient Soundbeds &amp; Drones
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Gekratzte und gestrichene Becken, Shaker-Klangwolken und getweakte Hallräume. Ideal als atmosphärischer Teppich für Tracks von Ambient bis Melodic Techno.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Sofortige Tiefe für Breakdowns und Intros</li>
                                <li className="flex items-center gap-2">✓ Texturen mit organischem Timbre</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── THE PHILOSOPHY / WHY FREE FOR FEEDBACK? ─────────────── */}
                <section className="py-20 sm:py-28 bg-white/[0.02] border-y border-white/10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 sm:p-14 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-[#e44c65]/10 rounded-full blur-[100px] pointer-events-none" />

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3 text-[#e44c65] text-xs uppercase tracking-[0.24em] font-semibold">
                                    <HeartHandshake size={20} />
                                    <span>Die Idee dahinter</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-light tracking-[0.12em] uppercase text-white leading-snug">
                                    Warum kostenlos? Warum gegen Feedback?
                                </h2>

                                <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                                    „Als Musiker und Hybrid-Drummer verbringe ich unzählige Stunden damit, Sounds zu designen, Instrumente zu layern und neue Rhythmen zu testen. Statt dieses Pack einfach in irgendeinen Online-Shop zu stellen, möchte ich eine direkte Verbindung zu Produzenten aufbauen.“
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-[#e44c65]">1. Download</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Trage dich unten ein und erhalte sofortigen Zugriff auf alle WAV-Files des Packs.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-white">2. Testen</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Zieh die Loops und One-Shots in dein aktuelles Projekt in Ableton, Logic oder FL Studio.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-[#e44c65]">3. 2-Minuten Feedback</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            In ein paar Tagen schicke ich dir 3 kurze Fragen per Mail. Dein Feedback fließt direkt in Vol. 2 ein!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── LEAD CAPTURE FORM ───────────────────────────────────── */}
                <section id="download-form" className="py-24 sm:py-36 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#1c1d26]/80 border border-white/15 rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-2xl relative">
                        
                        {submitted ? (
                            /* SUCCESS STATE */
                            <div className="text-center py-10 space-y-8">
                                <div className="w-20 h-20 rounded-full bg-[#e44c65]/20 border border-[#e44c65] text-[#e44c65] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(228,76,101,0.4)]">
                                    <CheckCircle2 size={40} />
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                                        Erfolgreich freigeschaltet!
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        Dein Download ist bereit
                                    </h3>
                                    <p className="text-sm text-gray-300 max-w-md mx-auto font-light">
                                        Vielen Dank für deine Unterstützung! Klicke unten, um dein SYNTHESIS Sample Pack (.ZIP) sofort herunterzuladen.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="/downloads/SYNTHESIS-Sample-Pack-Santino-Scavelli.zip"
                                        download="SYNTHESIS-Sample-Pack-Santino-Scavelli.zip"
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#e44c65] text-white text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_35px_rgba(228,76,101,0.5)] hover:shadow-[0_0_50px_rgba(228,76,101,0.8)] hover:bg-[#c43c52] transition-all"
                                    >
                                        <Download size={20} />
                                        <span>SYNTHESIS Pack Herunterladen (.ZIP)</span>
                                    </a>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-gray-400 max-w-md mx-auto text-left space-y-1">
                                    <p className="text-white font-medium">Was als Nächstes passiert:</p>
                                    <p>Du erhältst in 3–5 Tagen eine kurze Feedback-E-Mail von Santino mit 3 Fragen. Viel Spaß beim Produzieren!</p>
                                </div>
                            </div>
                        ) : (
                            /* FORM STATE */
                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                                        Sofortiger Download
                                    </span>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        Hol dir SYNTHESIS kostenlos
                                    </h3>
                                    <p className="text-sm text-gray-400 font-light max-w-lg mx-auto">
                                        Trage deine Kontaktdaten ein, um den direkten Download freizuschalten. Kein Spam, keine Weitergabe — versprochen.
                                    </p>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Dein Name (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="z.B. Alex"
                                                className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#e44c65] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Deine E-Mail-Adresse <span className="text-[#e44c65]">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="alex@producer.com"
                                                className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#e44c65] focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Role & Genre */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Deine primäre Rolle
                                            </label>
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full bg-[#1c1d26] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e44c65] focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option value="Producer / Beatmaker">Musikproduzent / Beatmaker</option>
                                                <option value="Drummer / Percussionist">Schlagzeuger / Percussionist</option>
                                                <option value="Composer / Film & Game">Film- &amp; Game-Komponist</option>
                                                <option value="Sound Designer">Sound Designer</option>
                                                <option value="Hobby / Passionate">Hobbymusiker / Entdecker</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Dein Haupt-Genre
                                            </label>
                                            <select
                                                value={genre}
                                                onChange={(e) => setGenre(e.target.value)}
                                                className="w-full bg-[#1c1d26] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e44c65] focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option value="Electronic / Melodic Techno">Electronic / Melodic Techno</option>
                                                <option value="Hip-Hop / Lo-Fi / Trap">Hip-Hop / Lo-Fi / Trap</option>
                                                <option value="Cinematic / Ambient">Cinematic / Ambient</option>
                                                <option value="Pop / Indie / Rock">Pop / Indie / Rock</option>
                                                <option value="World / Fusion">World Music / Fusion</option>
                                                <option value="Other">Anderes Genre</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* DAW */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                            Deine bevorzugte DAW
                                        </label>
                                        <select
                                            value={daw}
                                            onChange={(e) => setDaw(e.target.value)}
                                            className="w-full bg-[#1c1d26] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e44c65] focus:outline-none transition-colors cursor-pointer"
                                        >
                                            <option value="Ableton Live">Ableton Live</option>
                                            <option value="Logic Pro">Logic Pro</option>
                                            <option value="FL Studio">FL Studio</option>
                                            <option value="Cubase / Nuendo">Cubase / Nuendo</option>
                                            <option value="Studio One">Studio One</option>
                                            <option value="Reaper">Reaper</option>
                                            <option value="Pro Tools">Pro Tools</option>
                                            <option value="Other">Andere DAW / Hardware Sampler</option>
                                        </select>
                                    </div>

                                    {/* Checkbox consent */}
                                    <div className="flex items-start gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#e44c65] focus:ring-[#e44c65] cursor-pointer"
                                        />
                                        <label htmlFor="consent" className="text-xs text-gray-400 font-light cursor-pointer">
                                            Ich erkläre mich einverstanden, in ein paar Tagen eine einmalige E-Mail mit 3 kurzen Feedback-Fragen zu erhalten.
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 px-8 bg-[#e44c65] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_25px_rgba(228,76,101,0.4)] hover:shadow-[0_0_40px_rgba(228,76,101,0.7)] hover:bg-[#c43c52] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span>Wird freigeschaltet...</span>
                                        ) : (
                                            <>
                                                <span>Download jetzt freischalten</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </section>

                {/* ─── FAQ ─────────────────────────────────────────────────── */}
                <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
                    <div className="text-center space-y-3 mb-12">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                            Häufige Fragen
                        </p>
                        <h3 className="text-2xl sm:text-4xl font-light tracking-[0.12em] uppercase text-white">
                            FAQ zu SYNTHESIS
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#e44c65]" />
                                Sind die Samples wirklich 100% Royalty-Free?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                Ja, absolut. Du darfst alle Sounds in kommerziellen Musikveröffentlichungen, Beats, Filmmusiken oder Streaming-Tracks verwenden, ohne Santino Credits geben oder Tantiemen zahlen zu müssen.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <FolderSync size={18} className="text-[#e44c65]" />
                                In welchem Format kommen die Dateien?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                Alle Samples liegen im unkomprimierten 24-Bit / 48kHz WAV-Format vor. Sie funktionieren reibungslos in jeder modernen DAW (Ableton, Logic, FL Studio, Cubase, Studio One etc.) sowie in Samplern (Maschine, MPC, Kontakt).
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <HelpCircle size={18} className="text-[#e44c65]" />
                                Wann und wie kommt der Feedback-Fragebogen?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                Etwa 3 bis 5 Tage nach deinem Download schickt Santino dir eine kurze E-Mail mit einem Link zu einem 2-Minuten-Formular. Du kannst ganz ehrlich sagen, was dir gefallen hat und was du dir für Vol. 2 wünschst.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
