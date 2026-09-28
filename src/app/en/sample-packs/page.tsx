"use client";

import { useState, useRef } from "react";
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
    HeartHandshake,
    Volume2,
    VolumeX,
    Repeat
} from "lucide-react";

interface DemoTrack {
    id: number;
    title: string;
    category: string;
    bpm: string;
    description: string;
    duration: string;
    audioSrc: string;
}

const demos: DemoTrack[] = [
    {
        id: 1,
        title: "01. Acid Synth Groove",
        category: "Modular & Acid Synth",
        bpm: "approx. 124 BPM",
        description: "Driving modular 303-inspired synth lines, punchy transients, and kinetic groove layers from Santino's hybrid setup.",
        duration: "0:11",
        audioSrc: "/audio/demos/acid-synth-groove-124bpm.wav",
    },
    {
        id: 2,
        title: "02. Organic Percussion Pulse",
        category: "Ethnic & Hybrid",
        bpm: "approx. 130 BPM",
        description: "Warm frame drum resonance, organic shaker movement, and articulate acoustic accents with human feel.",
        duration: "0:06",
        audioSrc: "/audio/demos/organic-percussion-pulse-130bpm.wav",
    },
    {
        id: 3,
        title: "03. Industrial Dub Rhythms",
        category: "Dub & Space",
        bpm: "approx. 150 BPM",
        description: "Deep half-time grooves, metallic acoustic spaces, analog tape delays, and heavy sub punch.",
        duration: "0:08",
        audioSrc: "/audio/demos/industrial-dub-rhythms-75bpm.wav",
    },
    {
        id: 4,
        title: "04. Fast Breakbeat Drive",
        category: "Jungle & Breakbeat",
        bpm: "approx. 165 BPM",
        description: "High-octane breakbeat energy, crisp snare ghost notes, and open Meinl Byzance cymbal air.",
        duration: "0:08",
        audioSrc: "/audio/demos/fast-breakbeat-drive-165bpm.wav",
    },
    {
        id: 5,
        title: "05. Lo-Fi Chillhop Kit",
        category: "Lo-Fi & Downtempo",
        bpm: "approx. 82 BPM",
        description: "Dusty vintage tape warmth, mellow kick transients, relaxed rimshots, and intimate textures.",
        duration: "0:12",
        audioSrc: "/audio/demos/lo-fi-chillhop-kit-82bpm.wav",
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

    // Real Audio Player State
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [loopTrack, setLoopTrack] = useState(true);

    const togglePlay = (index: number) => {
        if (!audioRef.current) return;

        if (currentTrackIndex === index) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error("Audio playback error:", err));
            }
        } else {
            setCurrentTrackIndex(index);
            audioRef.current.src = demos[index].audioSrc;
            audioRef.current.currentTime = 0;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error("Audio playback error:", err));
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = Math.max(0, Math.min(duration, (clickX / rect.width) * duration));
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleEnded = () => {
        if (loopTrack) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            }
        } else {
            const nextIdx = (currentTrackIndex + 1) % demos.length;
            togglePlay(nextIdx);
        }
    };

    const formatTime = (timeInSec: number) => {
        if (isNaN(timeInSec)) return "0:00";
        const mins = Math.floor(timeInSec / 60);
        const secs = Math.floor(timeInSec % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#e44c65]/10 rounded-full blur-[140px]" />
                <div className="absolute top-3/4 right-10 w-[500px] h-[400px] bg-purple-900/10 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10">
                {/* ─── UNDER CONSTRUCTION / COMING SOON HEADER ─── */}
                <section className="pt-32 sm:pt-36 pb-4 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-block p-6 sm:p-8 rounded-3xl bg-amber-500/[0.08] border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] backdrop-blur-xl">
                        <div className="text-7xl sm:text-8xl md:text-9xl select-none leading-none mb-4 filter drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                            🚧
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">
                            <span>Under Construction</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase text-white mb-2">
                            Coming Soon
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
                            The <strong className="text-white font-semibold">SYNTHESIS Sample Pack</strong> is in its final touches ahead of the official Instagram campaign launch. Listen to the audio demos below and secure your spot on the <strong className="text-white">VIP Waitlist</strong> for instant early access upon release!
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
                                <span>VIP Early Access · Limited Feedback Edition</span>
                            </div>

                            <div className="space-y-6 sm:space-y-7">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.16em] uppercase text-white leading-[1.1]">
                                    SYNTHESIS
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-[0.14em] uppercase">
                                    Electronic Beats, Hybrid Drums &amp; Punchy One-Shots
                                </p>
                                <p className="text-xs sm:text-sm text-[#e44c65] tracking-[0.22em] uppercase font-medium">
                                    The Rhythmic Fusion · Created by Santino Scavelli
                                </p>
                            </div>

                            <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                                Organic meets electronic. A handpicked collection of punchy one-shots, percussive impulses, and hybrid fusion drums. Created for music producers, sound designers, and beatmakers seeking a cohesive, punchy sound palette.
                            </p>

                            {/* Key specs pills */}
                            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Quality</div>
                                    <div className="text-sm font-semibold text-white mt-1">24-Bit / 48kHz</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">License</div>
                                    <div className="text-sm font-semibold text-[#e44c65] mt-1">100% Royalty-Free</div>
                                </div>
                                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-center">
                                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">Format</div>
                                    <div className="text-sm font-semibold text-white mt-1">Pure One-Shots</div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                <a
                                    href="#download-form"
                                    className="w-full sm:w-auto px-8 py-4 bg-[#e44c65] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_30px_rgba(228,76,101,0.4)] hover:shadow-[0_0_45px_rgba(228,76,101,0.7)] hover:bg-[#c43c52] transition-all text-center flex items-center justify-center gap-3 cursor-pointer"
                                >
                                    <Sparkles size={18} />
                                    <span>Join VIP Waitlist</span>
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
                                            alt="SYNTHESIS Sample Pack - Electronic & Hybrid Drum One-Shots"
                                            fill
                                            priority
                                            className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="mt-4 px-2 flex items-center justify-between text-xs tracking-[0.16em] uppercase text-white/50">
                                        <span>Sample Library Vol. 1</span>
                                        <span className="text-amber-400 font-semibold">Coming Soon · VIP Access</span>
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
                                All 5 beats recorded directly from Santino's hybrid setup. Click play to preview immediately in your browser.
                            </p>
                        </div>

                        {/* Hidden HTML5 Audio Element */}
                        <audio
                            ref={audioRef}
                            src={demos[currentTrackIndex].audioSrc}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleEnded}
                            loop={loopTrack}
                            preload="metadata"
                        />

                        {/* Player Container */}
                        <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
                            {/* Track Selector list */}
                            <div className="space-y-3.5 mb-8">
                                {demos.map((demo, idx) => {
                                    const isCurrent = currentTrackIndex === idx;
                                    return (
                                        <div
                                            key={demo.id}
                                            onClick={() => togglePlay(idx)}
                                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                                                isCurrent
                                                    ? "bg-white/[0.07] border-[#e44c65]/60 shadow-[0_0_25px_rgba(228,76,101,0.18)]"
                                                    : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <button
                                                    type="button"
                                                    aria-label="Play/Pause"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        togglePlay(idx);
                                                    }}
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                                        isCurrent && isPlaying
                                                            ? "bg-[#e44c65] text-white shadow-[0_0_20px_rgba(228,76,101,0.6)] scale-105"
                                                            : "bg-white/10 text-white hover:bg-[#e44c65] hover:text-white"
                                                    }`}
                                                >
                                                    {isCurrent && isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                                                </button>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2.5 flex-wrap">
                                                        <h4 className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                                                            isCurrent ? "text-white" : "text-white/90 group-hover:text-white"
                                                        }`}>
                                                            {demo.title}
                                                        </h4>
                                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 font-bold shrink-0">
                                                            {demo.bpm}
                                                        </span>
                                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/50 font-medium shrink-0 hidden md:inline-block">
                                                            {demo.category}
                                                        </span>
                                                        {isCurrent && isPlaying && (
                                                            <span className="inline-flex items-center gap-1 text-[11px] text-[#e44c65] font-semibold animate-pulse shrink-0">
                                                                <Volume2 size={12} />
                                                                <span>Playing...</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 font-light truncate mt-1">
                                                        {demo.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                <span className={`text-xs tracking-wider uppercase font-mono px-2.5 py-1 rounded-lg ${
                                                    isCurrent ? "text-[#e44c65] bg-[#e44c65]/10 font-bold" : "text-white/40 bg-white/5"
                                                }`}>
                                                    {isCurrent && isPlaying ? formatTime(currentTime) : demo.duration}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Active Audio Player & Interactive Waveform Display */}
                            <div className="bg-black/50 rounded-2xl p-6 sm:p-7 border border-white/10 space-y-4 shadow-inner">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs uppercase tracking-wider text-white/70">
                                    <div className="flex items-center gap-2.5 min-w-0 truncate">
                                        <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-[#e44c65] animate-ping" : "bg-white/20"}`} />
                                        <span className="font-semibold text-white truncate">
                                            {demos[currentTrackIndex].title}
                                        </span>
                                        <span className="text-[#e44c65] text-[11px] font-bold">
                                            ({demos[currentTrackIndex].bpm})
                                        </span>
                                    </div>

                                    {/* Player Controls: Time, Loop, Mute */}
                                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                                        <span className="font-mono text-white/80 text-xs bg-white/5 px-2.5 py-1 rounded-lg">
                                            {formatTime(currentTime)} / {formatTime(duration || 10)}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setLoopTrack(!loopTrack)}
                                            title={loopTrack ? "Loop enabled (beat repeats)" : "Loop disabled"}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                loopTrack 
                                                    ? "bg-[#e44c65]/20 border-[#e44c65]/50 text-[#e44c65]" 
                                                    : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                                            }`}
                                        >
                                            <Repeat size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={toggleMute}
                                            title={isMuted ? "Unmute" : "Mute"}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                isMuted 
                                                    ? "bg-red-500/20 border-red-500/50 text-red-400" 
                                                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                                            }`}
                                        >
                                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Clickable Interactive Waveform with Scrubbing */}
                                <div
                                    onClick={handleSeek}
                                    className="h-20 flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1 bg-black/40 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative select-none"
                                    title="Click to seek within beat"
                                >
                                    {Array.from({ length: 48 }).map((_, i) => {
                                        const progress = duration > 0 ? currentTime / duration : 0;
                                        const barProgress = i / 48;
                                        const isPassed = barProgress <= progress;

                                        const baseHeight = ((Math.sin(i * 0.45) + 1.2) * 32 + 18);
                                        const animHeight = isPlaying 
                                            ? Math.min(100, baseHeight * (0.85 + (Math.sin((currentTime * 8) + i) * 0.25)))
                                            : baseHeight * 0.45;

                                        return (
                                            <div
                                                key={i}
                                                className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                                                    isPassed
                                                        ? "bg-[#e44c65] shadow-[0_0_8px_rgba(228,76,101,0.5)]"
                                                        : isPlaying
                                                        ? "bg-white/40"
                                                        : "bg-white/20 group-hover:bg-white/30"
                                                }`}
                                                style={{ height: `${animHeight}%` }}
                                            />
                                        );
                                    })}
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-white/40 pt-1">
                                    <span>Click waveform to scrub</span>
                                    <span className="text-[#e44c65]/80 font-medium">100% Original WAV Preview</span>
                                </div>
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
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">01 · Organic &amp; Expressive</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Ethnic &amp; Hybrid Percussion
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Handcrafted Meinl Darbukas, Frame Drums, Djembes, and Shakers. Recorded with detailed close and room miking to capture rich resonance and natural acoustic feel.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Dynamic ghost notes, slaps &amp; rim shots</li>
                                <li className="flex items-center gap-2">✓ 100% pure one-shot hits (no loops)</li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Sliders size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">02 · Digital &amp; Analog</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Electronic &amp; Synth Impulses
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Modulated clicks, hard transients, synthetic sub-impulses, and futuristic electronic drums. Crafted to give every rhythm modern punch and electronic authority.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Perfect for layering behind organic percussion sounds</li>
                                <li className="flex items-center gap-2">✓ Sharp transient attack &amp; deep sub warmth</li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Music2 size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">03 · Seamless Unity</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Fusion Drum Elements
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Crisp snares, cohesive hi-hats, and well-balanced kicks. Santino's focus is on sonic fusion: acoustics and electronics mesh together as one cohesive sonic body.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Harmonically aligned, organic frequency profile</li>
                                <li className="flex items-center gap-2">✓ Mix-ready one-shots: Drop straight into your track</li>
                            </ul>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white/[0.025] border border-white/10 rounded-3xl p-8 hover:border-[#e44c65]/40 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e44c65] mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles size={24} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#e44c65] font-semibold">04 · Solo &amp; Groove Accents</span>
                            <h3 className="text-xl sm:text-2xl font-light tracking-[0.1em] uppercase text-white mt-2 mb-3">
                                Dynamic Accent Hits
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Expressive solo accents, fills, and unexpected transient hits for your arrangements. No drones or static pads – pure, dynamic one-shots.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-2">✓ Ideal for solos, rhythmic fills, and sharp accents</li>
                                <li className="flex items-center gap-2">✓ Looking for loops or basslines? Request them in feedback for Vol. 2!</li>
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
                                        <div className="text-2xl font-bold text-[#e44c65]">1. VIP Waitlist</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Sign up below and receive your VIP download link directly by email when the campaign launches.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-white">2. Test in DAW</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Drop the one-shots into your current project in Ableton, Logic, FL Studio or Cubase.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold text-[#e44c65]">3. 2-Min Feedback</div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            After testing, I will send you 3 quick survey questions. Your insights shape Volume 2 directly!
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
                                        Spot Successfully Reserved!
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        You are on the VIP Waitlist
                                    </h3>
                                    <p className="text-sm text-gray-300 max-w-md mx-auto font-light leading-relaxed">
                                        Thank you for your support! The SYNTHESIS Sample Pack will launch alongside the official Instagram campaign. You will receive your personal download link directly in your inbox!
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-gray-400 max-w-md mx-auto text-left space-y-1">
                                    <p className="text-white font-medium">What happens next:</p>
                                    <p>As soon as the campaign drops, we will send your download link straight to your email. We look forward to your honest feedback!</p>
                                </div>
                            </div>
                        ) : (
                            /* FORM STATE */
                            <div className="space-y-8">
                                <div className="text-center space-y-3">
                                    <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold">
                                        Exclusive Early Access
                                    </span>
                                    <h3 className="text-3xl sm:text-4xl font-light tracking-[0.14em] uppercase text-white">
                                        SYNTHESIS VIP Waitlist
                                    </h3>
                                    <p className="text-sm text-gray-400 font-light max-w-lg mx-auto">
                                        Enter your details below to reserve your priority access for the free early download when the campaign launches.
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
                                            I agree to receive the download link upon launch and a single follow-up email in a few days with 3 short feedback questions.
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 px-8 bg-[#e44c65] text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium rounded-full shadow-[0_0_25px_rgba(228,76,101,0.4)] hover:shadow-[0_0_40px_rgba(228,76,101,0.7)] hover:bg-[#c43c52] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <span>Reserving Spot...</span>
                                        ) : (
                                            <>
                                                <span>Join VIP Waitlist</span>
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
                                All samples are 100% pure one-shot hits in 24-bit / 48kHz uncompressed WAV format. No rigid loops or fixed basslines – giving you complete production freedom in any DAW (Ableton, Logic, FL Studio, Cubase, etc.) or hardware sampler.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                            <h4 className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <HelpCircle size={18} className="text-[#e44c65]" />
                                When will I receive the download link and survey?
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed pl-6">
                                As soon as the Instagram release campaign officially launches, all producers on the VIP waitlist will receive their download link directly via email. Around 3 to 5 days after downloading, you will receive a brief 3-question survey so your ideas can shape Volume 2!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
