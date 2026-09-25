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
        description: "Meinl Darbuka & Frame Drum layered with Nord Drum 3P sub pulses and organic reverb tails.",
        duration: "0:48",
    },
    {
        id: 2,
        title: "02. Deep Ambient Textures",
        category: "Atmospheres",
        bpm: "82 BPM",
        description: "Bowed Cymbals, granular shakers, and lush organic soundbeds for spatial immersion.",
        duration: "0:36",
    },
    {
        id: 3,
        title: "03. Modern Afro-Tribal Flow",
        category: "Acoustic & Ethnic",
        bpm: "122 BPM",
        description: "Tama Snare rimshots, Meinl Byzance cymbals, and dynamic riq fills with authentic human micro-timing.",
        duration: "0:52",
    },
    {
        id: 4,
        title: "04. Electronic Nord Soundbed",
        category: "Modular & Synth",
        bpm: "95 BPM",
        description: "Frequency modulated percussion clicks, analog transient punch, and deep sub drops.",
        duration: "0:41",
    },
];

export default function SamplePackPageEN() {
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
            setError("Please enter a valid email address.");
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
                throw new Error(data.error || "Something went wrong.");
            }

            setSubmitted(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Network error. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-200 font-sans selection:bg-[#e44c65] selection:text-white">
  {/* Construction Banner */}
  <div className="relative w-full overflow-hidden">
    <div className="h-12 -rotate-3 transform origin-left-top bg-[repeating-linear-gradient(135deg,#ef4444,#ef4444_12px,#fff_12px,#fff_24px)] flex items-center justify-center text-white text-sm font-bold">
      🚧 BAUSTELLE · COMING SOON · UNDER CONSTRUCTION 🚧
    </div>
  </div>
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#e44c65]/10 rounded-full blur-[140px]" />
                <div className="absolute top-3/4 right-10 w-[500px] h-[400px] bg-purple-900/10 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10">
                {/* ─── HERO SECTION ─────────────────────────────────────────── */}
                <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        {/* Left: Text & Pitch */}
                        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-[#e44c65] text-xs font-semibold uppercase tracking-[0.2em] shadow-lg">
                                <Sparkles size={14} className="animate-pulse" />
                                <span>Exclusive Early Access · Limited Feedback Edition</span>
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
                                Organic. Ethnic. Immersive. A handpicked collection of traditional world percussion, live acoustic drum elements, and futuristic sound synthesis. Designed for producers, composers, and sound designers seeking authenticity and cinematic depth.
                            </p>

                            {/* Key specs pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 pt-2">
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Quality</div>
                                    <div className="text-sm font-semibold text-white mt-1">24-Bit / 48kHz</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">License</div>
                                    <div className="text-sm font-semibold text-[#e44c65] mt-1">100% Royalty-Free</div>
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
                                    <span>Download Free (For Feedback)</span>
                                </a>
                                <a
                                    href="#demos"
                                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/15 text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Headphones size={18} className="text-[#e44c65]" />
                                    <span>Listen to Demos</span>
                                </a>
                            </div>
                        </div>

                        {/* Right: 3D Box Mockup Artwork */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative group w-full max-w-[420px]">
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
                                Sound &amp; Textures
                            </p>
                            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-white">
                                Listen to SYNTHESIS
                            </h2>
                            <p className="text-sm sm:text-base text-gray-400 font-light">
                                All tracks recorded with high-end tube preamps and top microphones. Here are four curated demo stems.
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
                                        <span>Current Track: {demos[currentTrackIndex].title}</span>
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
                                    Preview Mode · 100% Original WAV recordings from Santino's Hybrid Set
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── WHAT'S INSIDE ───────────────────────────────────────── */}
                <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                            Library Content
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-light tracking-[0.14em] uppercase text-white">
                            What's inside SYNTHESIS?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 font-light">
                            Four curated sound realms seamlessly uniting organic world percussion and analog synthesis.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Layers size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">01 · Tradition meets Modern</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Ethnic Percussion Stems
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Handcrafted Meinl Darbukas, Frame Drums, Djembes, Udu and Riq. Recorded with detailed close and room miking to capture rich resonance and true mechanical acoustic feel.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Dynamic ghost notes &amp; crisp slaps</li>
                                <li className="flex items-center gap-2">✓ One-shots &amp; flexible tempo-labeled loops</li>
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
                                Custom synthesized patches from the legendary Nord Drum 3P. Sub drops, modulated percussion clicks, futuristic rim accents, and tight electronic punch transients.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Ideal for layering behind acoustic kicks &amp; snares</li>
                                <li className="flex items-center gap-2">✓ Laser-sharp transient attack &amp; deep sub warmth</li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Music2 size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">03 · Acoustic Foundation</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Acoustic Drum Elements
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Tama Starclassic snares, tight hi-hats, and selected Meinl Byzance cymbals. Tracked dry and punchy in Santino's acoustically designed DrumHub studio.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Multiple velocity layers for authentic playback</li>
                                <li className="flex items-center gap-2">✓ Mix-ready analog tube warmth (SPL GoldMike MK2)</li>
                            </ul>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">04 · Cinematic &amp; Expansive</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Ambient Soundbeds &amp; Drones
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Bowed cymbals, shaker sound clouds, and granular spatial reverbs. Perfect as a cinematic atmospheric layer for any track from ambient to melodic techno.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Instant width and depth for intros &amp; breakdowns</li>
                                <li className="flex items-center gap-2">✓ Textures with distinct organic timbres</li>
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
                                    <span>The Concept</span>
                                </div>

                                <h2 className="text-2xl sm:text-4xl font-light tracking-[0.12em] uppercase text-white leading-snug">
                                    Why free? Why in exchange for feedback?
                                </h2>

                                <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                                    “As a hybrid drummer and recording artist, I spend hours crafting rhythms, layering percussion, and tweaking synthesis. Rather than just tossing this pack into an online storefront, I want to create a direct dialogue with producers.”
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-[#e44c65]">1. Download</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Sign up below and receive immediate download access to all full-resolution WAV files.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-white">2. Test in DAW</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Drop the loops and one-shots into your current project in Ableton, Logic, FL Studio or Cubase.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-[#e44c65]">3. 2-Min Feedback</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            In a few days, I will send you 3 quick survey questions. Your insights shape Volume 2 directly!
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
                                        Successfully Unlocked!
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        Your download is ready
                                    </h3>
                                    <p className="text-sm text-gray-300 max-w-md mx-auto font-light">
                                        Thank you for your support! Click below to download your complete SYNTHESIS Sample Pack (.ZIP) instantly.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href="/downloads/SYNTHESIS-Sample-Pack-Santino-Scavelli.zip"
                                        download="SYNTHESIS-Sample-Pack-Santino-Scavelli.zip"
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#e44c65] text-white text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_35px_rgba(228,76,101,0.5)] hover:shadow-[0_0_50px_rgba(228,76,101,0.8)] hover:bg-[#c43c52] transition-all"
                                    >
                                        <Download size={20} />
                                        <span>Download SYNTHESIS Pack (.ZIP)</span>
                                    </a>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-gray-400 max-w-md mx-auto text-left space-y-1">
                                    <p className="text-white font-medium">What happens next:</p>
                                    <p>You'll receive a short feedback email from Santino in 3–5 days with 3 quick questions. Enjoy creating!</p>
                                </div>
                            </div>
                        ) : (
                            /* FORM STATE */
                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                                        Immediate Download
                                    </span>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        Get SYNTHESIS for Free
                                    </h3>
                                    <p className="text-sm text-gray-400 font-light max-w-lg mx-auto">
                                        Enter your details below to unlock instant download access. No spam, ever — guaranteed.
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
                                                Your Name (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Alex"
                                                className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#e44c65] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Your Email Address <span className="text-[#e44c65]">*</span>
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
                                                Your Primary Role
                                            </label>
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full bg-[#1c1d26] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e44c65] focus:outline-none transition-colors cursor-pointer"
                                            >
                                                <option value="Producer / Beatmaker">Music Producer / Beatmaker</option>
                                                <option value="Drummer / Percussionist">Drummer / Percussionist</option>
                                                <option value="Composer / Film & Game">Film &amp; Game Composer</option>
                                                <option value="Sound Designer">Sound Designer</option>
                                                <option value="Hobby / Passionate">Music Creator / Hobbyist</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                                Primary Genre
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
                                                <option value="Other">Other Genre</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* DAW */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.14em] text-white/70 block">
                                            Primary DAW
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
                                            <option value="Other">Other DAW / Hardware Sampler</option>
                                        </select>
                                    </div>

                                    {/* Checkbox consent */}
                                    <div className="flex items-start gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="consent-en"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#e44c65] focus:ring-[#e44c65] cursor-pointer"
                                        />
                                        <label htmlFor="consent-en" className="text-xs text-gray-400 font-light cursor-pointer">
                                            I agree to receive a single follow-up email in a few days with 3 short feedback questions.
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 px-8 bg-[#e44c65] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_25px_rgba(228,76,101,0.4)] hover:shadow-[0_0_40px_rgba(228,76,101,0.7)] hover:bg-[#c43c52] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span>Unlocking Download...</span>
                                        ) : (
                                            <>
                                                <span>Unlock Instant Download</span>
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
                            Frequently Asked Questions
                        </p>
                        <h3 className="text-2xl sm:text-4xl font-light tracking-[0.12em] uppercase text-white">
                            SYNTHESIS FAQ
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#e44c65]" />
                                Are all samples really 100% Royalty-Free?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                Yes, 100%. You can use every sound in commercial song releases, beat sales, streaming tracks, and soundtrack work with zero royalties or mandatory credits.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <FolderSync size={18} className="text-[#e44c65]" />
                                What file format are the sounds in?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                All samples are 24-bit / 48kHz uncompressed WAV files. They drag-and-drop seamlessly into any digital audio workstation (Ableton, Logic, FL Studio, Cubase, Studio One, etc.) or hardware sampler.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <HelpCircle size={18} className="text-[#e44c65]" />
                                When and how will I receive the feedback survey?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                Around 3 to 5 days after downloading, Santino will send you a brief email containing a link to a 2-minute survey form. Your honest opinions will directly influence upcoming sound pack expansions!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
