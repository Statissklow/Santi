"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Instagram, Facebook, Youtube, Linkedin, Music, ArrowRight, Play, Mic, Drum, Compass, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="font-sans">

            {/* 1. Banner Section */}
            <section id="banner" className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-20">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="/images/banner.jpg"
                        alt="Background"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    {/* Overlay with Blend Mode for depth */}
                    <div className="absolute inset-0 bg-[#1c1d26]/85 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d26]/70 via-[#1c1d26]/40 to-[#1c1d26]" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center my-auto">

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                        {/* Text Side */}
                        <div className="text-center md:text-right max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                            <FadeIn direction="up" delay={0.1}>
                                {/* Official Artist Logo - Significantly enlarged & wider than subtitle */}
                                <div className="flex justify-center md:justify-end mb-4 sm:mb-6">
                                    <div className="w-[340px] sm:w-[480px] md:w-[600px] lg:w-[720px] xl:w-[840px] max-w-full">
                                        <Image
                                            src="/images/santino-logo-hd.png"
                                            alt="Santino Scavelli"
                                            width={1533}
                                            height={486}
                                            className="w-full h-auto object-contain filter drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)]"
                                            priority
                                        />
                                    </div>
                                    <h1 className="sr-only">Santino Scavelli</h1>
                                </div>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.2}>
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/85 font-light tracking-[0.16em] sm:tracking-[0.22em] uppercase whitespace-normal sm:whitespace-nowrap">
                                    Hybrid Drummer • Educator • Producer
                                </p>
                            </FadeIn>
                        </div>

                        {/* Profile Image Side with Glow */}
                        <FadeIn direction="right" delay={0.3}>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[#e44c65]/35 via-[#e44c65]/15 to-amber-500/25 rounded-full blur-3xl opacity-85 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-56 h-56 sm:w-68 sm:h-68 lg:w-80 lg:h-80 flex-shrink-0 rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden bg-white/5 backdrop-blur-md">
                                    <Image
                                        src="/images/profil.png"
                                        alt="Santino Scavelli Profile"
                                        fill
                                        className="object-contain scale-110 translate-y-2"
                                    />
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => scrollToSection("services")}
                            className="animate-bounce text-white/50 hover:text-[#e44c65] transition-colors p-2 cursor-pointer"
                            aria-label="Scroll down"
                        >
                            <ChevronDown size={44} />
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Quick Overview / Services Section */}
            <section id="services" className="relative py-24 bg-[#161720] border-t border-white/5 overflow-hidden">
                {/* Subtle Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#e44c65]/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <header className="text-center mb-24 sm:mb-28">
                        <FadeIn>
                            <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium mb-3 block">
                                Portfolio &amp; Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.16em] uppercase mt-6 sm:mt-8">
                                Areas & Expertise
                            </h2>
                        </FadeIn>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Studio & Recording */}
                        <FadeIn delay={0.1}>
                            <div className="group h-full flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] hover:-translate-y-1">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-[#e44c65]/15 text-[#e44c65] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Mic size={32} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#e44c65] bg-[#e44c65]/10 px-3.5 py-1.5 rounded-lg border border-[#e44c65]/30">
                                        Studio & Sound
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Recording</h3>
                                    <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                                        Signature drum sounds and percussion tracks for your production. Featuring the unique custom hybrid split-set.
                                    </p>
                                    <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Hybrid Split-Set & Percussion</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>High-End Acoustics & Preamps</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Remote Drum Tracks & Stems</span>
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/en/recording"
                                    className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                                >
                                    <span>To the Studio</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </FadeIn>

                        {/* Card 2: Lessons & DrumHub */}
                        <FadeIn delay={0.2}>
                            <div className="group h-full flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] hover:-translate-y-1">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-[#e44c65]/15 text-[#e44c65] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Drum size={32} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#e44c65] bg-[#e44c65]/10 px-3.5 py-1.5 rounded-lg border border-[#e44c65]/30">
                                        Coaching & Portal
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Lessons</h3>
                                    <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                                        Contemporary drum and cajon education with individual coaching, direct musical focus, and DrumHub student portal access.
                                    </p>
                                    <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Drums & Cajon (All Levels)</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Includes DrumHub Student Portal</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Focus on Groove, Timing & Tone</span>
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/en/lessons"
                                    className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                                >
                                    <span>Explore Lessons</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </FadeIn>

                        {/* Card 3: Live & Musical Direction */}
                        <FadeIn delay={0.3}>
                            <div className="group h-full flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] hover:-translate-y-1">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-[#e44c65]/15 text-[#e44c65] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Compass size={32} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#e44c65] bg-[#e44c65]/10 px-3.5 py-1.5 rounded-lg border border-[#e44c65]/30">
                                        Stage & Theater
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Live & Direction</h3>
                                    <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                                        Musical Director at the National Theatre Mannheim, band collaborations, worldwide tours, and masterclasses.
                                    </p>
                                    <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Musical Director National Theatre</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Award-Winning Projects</span>
                                        </li>
                                        <li className="flex items-center gap-2.5">
                                            <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                                            <span>Tours & Masterclasses</span>
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/en/about"
                                    className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                                >
                                    <span>About Santino</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. Video Section */}
            <section id="videos" className="relative py-28 overflow-hidden bg-[#1c1d26]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="/images/pic02.jpg"
                        alt="Background Texture"
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center top" }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <header className="text-center mb-24 sm:mb-28">
                        <FadeIn>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide uppercase border-b-2 border-[#e44c65] inline-block pb-3 drop-shadow-lg">
                                VIDEOS & PERFORMANCES
                            </h2>
                        </FadeIn>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Video 1: Solo & Technique */}
                        <FadeIn delay={0.1}>
                            <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                                <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <span className="text-sm font-bold text-white/90 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                        Solo &amp; Technique
                                    </span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Solo</span>
                                </div>
                                <div className="aspect-video bg-black">
                                    <iframe
                                        width="100%" height="100%"
                                        src="https://www.youtube.com/embed/_UdJSzDN3G4"
                                        title="Solo & Technique"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </FadeIn>
                        {/* Video 2: Studio Session */}
                        <FadeIn delay={0.2}>
                            <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                                <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <span className="text-sm font-bold text-white/90 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        Studio Session
                                    </span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Session</span>
                                </div>
                                <div className="aspect-video bg-black">
                                    <iframe
                                        width="100%" height="100%"
                                        src="https://www.youtube.com/embed/eqL8RmaQTKw"
                                        title="Studio Session"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </FadeIn>
                        {/* Video 3: Live Performance */}
                        <FadeIn delay={0.3}>
                            <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                                <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <span className="text-sm font-bold text-white/90 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                                        Live Performance
                                    </span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Stage</span>
                                </div>
                                <div className="aspect-video bg-black">
                                    <iframe
                                        width="100%" height="100%"
                                        src="https://www.youtube.com/embed/QphDrDJStWQ"
                                        title="Live Performance"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. Logos / Endorsements Section */}
            <section className="bg-[#14151c] py-24 sm:py-28 border-y border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16 sm:mb-20">
                            <span className="text-sm uppercase tracking-[0.25em] text-white/60 font-bold border-b border-white/10 pb-3 inline-block">
                                Official Endorser & Partner Brands
                            </span>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/Meinl II.png" alt="Meinl" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/tama.png" alt="Tama" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/evansII .png" alt="Evans" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/Audix.png" alt="Audix" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/Download (1).png" alt="Logo" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/Hoerluchs.png" alt="Hoerluchs" fill className="object-contain" /></div>
                            <div className="h-12 relative w-36 shrink-0"><Image src="/images/zoomII.png" alt="Zoom" fill className="object-contain" /></div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 5. Feature Spotlights */}

            {/* About Santino - Text Left, Image Right */}
            <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] bg-[#1c1d26] overflow-hidden">
                {/* Content Side */}
                <div className="flex items-center p-8 sm:p-12 lg:p-16 xl:p-20 order-2 lg:order-1 lg:col-span-6 xl:col-span-5 bg-[#1c1d26] relative z-20">
                    <div className="w-full mr-auto text-left">
                        <FadeIn direction="right">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 lg:mb-8 tracking-[0.14em] uppercase">
                                About Santino
                            </h2>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                                Santino Scavelli is one of the most exciting artists in the contemporary world music scene.
                                With his unique style and virtuosity, he has earned prestigious international recognition.
                            </p>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                                As Musical Director at the National Theatre Mannheim and through his collaboration
                                with international artists, he continues to shape modern hybrid drumming.
                            </p>

                            {/* Clean Bullet Points */}
                            <ul className="space-y-3.5 mb-10 text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Award-Winning World Music Artist & Soloist</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Musical Director at National Theatre Mannheim</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>International Tours & Masterclasses</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>World Music, Fusion & Modern Percussion</span>
                                </li>
                            </ul>

                            <Link
                                href="/en/about"
                                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
                            >
                                Learn more
                            </Link>
                        </FadeIn>
                    </div>
                </div>
                {/* Image Side */}
                <div className="relative min-h-[45vh] lg:min-h-full order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
                    <Image
                        src="/images/pic04.jpg"
                        alt="Santino Live"
                        fill
                        className="object-cover"
                    />
                    {/* Gradient for seamless blend */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1c1d26] via-[#1c1d26]/80 to-transparent lg:w-2/3 z-10" />
                </div>
            </section>

            {/* Recording - Text Right, Image Left */}
            <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] bg-[#1e1f29] overflow-hidden">
                {/* Image Side */}
                <div className="relative min-h-[45vh] lg:min-h-full order-1 lg:col-span-6 xl:col-span-7">
                    <Image
                        src="/images/pic11.jpg"
                        alt="Recording"
                        fill
                        className="object-cover"
                    />
                    {/* Gradient for seamless blend */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#1e1f29] via-[#1e1f29]/80 to-transparent lg:w-2/3 lg:left-auto lg:right-0 z-10" />
                </div>
                {/* Content Side */}
                <div className="flex items-center p-8 sm:p-12 lg:p-16 xl:p-20 order-2 lg:col-span-6 xl:col-span-5 bg-[#1e1f29] relative z-20">
                    <div className="w-full ml-auto text-left">
                        <FadeIn direction="left">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 lg:mb-8 tracking-[0.14em] uppercase">
                                Studio & Recording
                            </h2>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                                Your Sound. Professionally produced. In Santino&apos;s studio, recordings are created
                                for renowned artists – whether percussion, drums, or both.
                            </p>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                                The highlight: His custom hybrid &quot;Split-Set&quot;, perfect for organic-electronic beats.
                                Get powerful, high-definition drums for your production!
                            </p>

                            {/* Clean Bullet Points */}
                            <ul className="space-y-3.5 mb-10 text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Specialized Hybrid Split-Set for organic-electronic beats</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>High-End preamps & custom room acoustics</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Individual percussion & drum multi-tracks</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Reliable remote production & rapid turnaround</span>
                                </li>
                            </ul>

                            <Link
                                href="/en/recording"
                                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
                            >
                                Visit Studio
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Lessons - Text Left, Image Right */}
            <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] bg-[#1c1d26] overflow-hidden">
                {/* Content Side */}
                <div className="flex items-center p-8 sm:p-12 lg:p-16 xl:p-20 order-2 lg:order-1 lg:col-span-6 xl:col-span-5 bg-[#1c1d26] relative z-20">
                    <div className="w-full mr-auto text-left">
                        <FadeIn direction="right">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 lg:mb-8 tracking-[0.14em] uppercase">
                                Lessons
                            </h2>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 font-normal">
                                Unleash your rhythmic potential!
                            </p>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                                Whether complete beginner or seasoned professional – with me, it&apos;s not just about technique,
                                but about <strong>groove, expression, and musical voice</strong>.
                            </p>
                            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                                Experience modern drumming education that drives real progress.
                                Personalized coaching, practical groove concepts, and the fast track to your authentic sound.
                            </p>

                            {/* Clean Bullet Points */}
                            <ul className="space-y-3.5 mb-10 text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Drum Set & Cajon for all skill levels (Beginners to Pros)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Includes 24/7 access to the DrumHub Student Portal</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Focus on natural feel, timing, dynamics & tone</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                                    <span>Custom charts, backing tracks & 1-on-1 mentorship</span>
                                </li>
                            </ul>

                            <Link
                                href="/en/lessons"
                                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
                            >
                                Get started now
                            </Link>
                        </FadeIn>
                    </div>
                </div>
                {/* Image Side */}
                <div className="relative min-h-[45vh] lg:min-h-full order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
                    <Image
                        src="/images/pic03.jpg"
                        alt="Lessons"
                        fill
                        className="object-cover"
                    />
                    {/* Gradient for seamless blend */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1c1d26] via-[#1c1d26]/80 to-transparent lg:w-2/3 z-10" />
                </div>
            </section>

            {/* Newsletter Teaser */}
            <section className="py-20 bg-[#e44c65] text-center px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 tracking-[0.16em] uppercase">Subscribe to Newsletter</h2>
                        <p className="text-white/90 mb-8 text-lg font-light tracking-wide">
                            Stay up to date on new courses, workshops, and concerts.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-16">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="px-6 py-4 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-white/30 w-full shadow-lg"
                            />
                            <button type="submit" className="px-8 py-4 bg-white text-[#e44c65] font-medium uppercase tracking-[0.14em] text-sm rounded-full hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105">
                                Subscribe
                            </button>
                        </form>

                        <div className="border-t border-white/30 pt-10 mt-8">
                            <p className="text-white/80 mb-8 font-medium tracking-[0.24em] uppercase text-xs">Follow me on Social Media</p>
                            <div className="flex justify-center gap-8">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                                    <Instagram size={36} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                                    <Facebook size={36} />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                                    <Youtube size={36} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                                    <Linkedin size={36} />
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                                    <Music size={36} />
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
