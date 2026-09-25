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
                    alt="Santino Scavelli Profil"
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
              aria-label="Nach unten scrollen"
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
                Bereiche &amp; Expertise
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
                    Studio &amp; Sound
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Recording</h3>
                  <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                    Fetter, maßgeschneiderter Sound für deine Produktion. Inklusive speziellem Hybrid-Split-Set für akustisch-elektronische Beats.
                  </p>
                  <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Hybrides Split-Set &amp; Percussion</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>High-End Akustik &amp; Mikrofone</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Remote Drum Tracks &amp; Stems</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/recording"
                  className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                >
                  <span>Zum Studio</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </FadeIn>

            {/* Card 2: Unterricht & DrumHub */}
            <FadeIn delay={0.2}>
              <div className="group h-full flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] hover:-translate-y-1">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#e44c65]/15 text-[#e44c65] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Drum size={32} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#e44c65] bg-[#e44c65]/10 px-3.5 py-1.5 rounded-lg border border-[#e44c65]/30">
                    Coaching &amp; Portal
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Unterricht</h3>
                  <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                    Praxisnaher Schlagzeug- &amp; Cajon-Unterricht mit modernem Konzept, individuellem Coaching und Zugang zum DrumHub-Portal.
                  </p>
                  <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Schlagzeug &amp; Cajon (jedes Level)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Inklusive DrumHub Schüler-Portal</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Fokus auf Groove, Timing &amp; Sound</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/lessons"
                  className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                >
                  <span>Unterricht entdecken</span>
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
                    Bühne &amp; Theater
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mt-4 mb-3 tracking-[0.08em] uppercase">Live &amp; Direction</h3>
                  <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                    Musical Director am Nationaltheater Mannheim, Band-Kollaborationen, Tourneen und weltweite Meisterkurse.
                  </p>
                  <ul className="space-y-3 text-sm sm:text-base text-white/80 mb-8 font-light">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Musical Director Nationaltheater</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Mehrfach ausgezeichnete Projekte</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-[#e44c65] shrink-0" />
                      <span>Tourneen &amp; Workshops</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/about"
                  className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-[#e44c65] text-white text-center font-medium text-xs sm:text-sm uppercase tracking-[0.16em] border border-white/15 hover:border-[#e44c65] transition-all flex items-center justify-center gap-2.5 group-hover:shadow-lg cursor-pointer"
                >
                  <span>Über Santino</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Video Section */}
      <section id="videos" className="relative py-24 overflow-hidden bg-[#1c1d26]">
        {/* Parallax Background */}
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
              <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium mb-6 sm:mb-8 block">
                Bühne &amp; Performance
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.2em] uppercase border-b-2 border-[#e44c65] inline-block pb-4">
                VIDEOS &amp; PERFORMANCES
              </h2>
            </FadeIn>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1: Solo & Technik */}
            <FadeIn delay={0.1}>
              <div className="rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <span className="text-sm font-bold text-white/90 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Solo &amp; Technik
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Solo</span>
                </div>
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%" height="100%"
                    src="https://www.youtube.com/embed/_UdJSzDN3G4"
                    title="Solo & Technik"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </FadeIn>
            {/* Video 2: Studio Session */}
            <FadeIn delay={0.2}>
              <div className="rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
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
              <div className="rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#e44c65]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(228,76,101,0.15)] group">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
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
              <span className="text-sm uppercase tracking-[0.25em] text-white/50 font-bold border-b border-white/10 pb-3 inline-block">
                Offizieller Endorser & Partner Brands
              </span>
            </div>
            {/* Flex container for logos */}
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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

      {/* 4. Feature Spotlights */}

      {/* About Santino - Text Left, Image Right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] bg-[#1c1d26] overflow-hidden">
        {/* Content Side */}
        <div className="flex items-center p-8 sm:p-12 lg:p-16 xl:p-20 order-2 lg:order-1 lg:col-span-6 xl:col-span-5 bg-[#1c1d26] relative z-20">
          <div className="w-full mr-auto text-left">
            <FadeIn direction="right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 lg:mb-12 tracking-[0.14em] uppercase">
                Über Santino
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                Santino Scavelli ist einer der aufregendsten Musiker der zeitgenössischen Weltmusik-Szene.
                Mit seinem einzigartigen Stil und Können hat er bereits mehrere renommierte
                Auszeichnungen erhalten.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                Als Musical Director am Nationaltheater Mannheim und durch seine Zusammenarbeit
                mit internationalen Künstlern hat er weitreichende Anerkennung gefunden.
              </p>

              {/* Clean Bullet Points */}
              <ul className="space-y-3.5 mb-10 text-base sm:text-lg text-white/85 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Mehrfach ausgezeichneter Weltmusik-Preisträger</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Musical Director am Nationaltheater Mannheim</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Internationale Tourneen &amp; Meisterkurse</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Weltmusik, Fusion &amp; moderne Percussion</span>
                </li>
              </ul>

              <Link
                href="/about"
                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
              >
                Mehr erfahren
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 lg:mb-12 tracking-[0.14em] uppercase">
                Studio &amp; Recording
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                Dein Sound. Professionell produziert. In Santinos Studio entstehen Aufnahmen
                für renommierte Künstler – egal ob Percussion, Drums oder beides.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                Das Highlight: Sein selbstgebautes hybrides &quot;Split-Set&quot;, perfekt für organisch-elektronische Beats.
                Hol dir den fetten Sound für deine Produktion!
              </p>

              {/* Clean Bullet Points */}
              <ul className="space-y-3.5 mb-10 text-base sm:text-lg text-white/85 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Spezielles Hybrid Split-Set für organisch-elektronische Beats</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>High-End Vorverstärker &amp; maßgeschneiderte Raumakustik</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Individuelle Percussion- und Drum-Multi-Tracks</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Zuverlässige Remote-Produktion &amp; schnelle Lieferung</span>
                </li>
              </ul>

              <Link
                href="/recording"
                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
              >
                Zum Studio
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 lg:mb-12 tracking-[0.14em] uppercase">
                Unterricht
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed mb-4 font-normal">
                Entfessle dein rhythmisches Potenzial!
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 font-light">
                Egal ob blutiger Anfänger oder fortgeschrittener Profi – bei mir geht es nicht nur um Technik,
                sondern um <strong>Ausdruck, Groove und Leidenschaft</strong>.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                Erlebe modernen Schlagzeug-Unterricht, der dich wirklich weiterbringt.
                Individuelles Coaching, praxisnahe Konzepte und der direkte Weg zu deinem eigenen Sound.
              </p>

              {/* Clean Bullet Points */}
              <ul className="space-y-3.5 mb-10 text-base sm:text-lg text-white/85 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Schlagzeug &amp; Cajon für jedes Level (Anfänger bis Profis)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Inklusive Zugang zum exklusiven DrumHub Schüler-Portal</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Fokus auf natürlichen Groove, Timing und Sound-Entwicklung</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e44c65] shrink-0 shadow-[0_0_10px_#e44c65]" />
                  <span>Praxisnahe Noten, Backing Tracks und individuelles Coaching</span>
                </li>
              </ul>

              <Link
                href="/lessons"
                className="inline-block border border-[#e44c65] text-[#e44c65] px-9 py-4 rounded-full hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_20px_rgba(228,76,101,0.2)] hover:shadow-[0_0_30px_rgba(228,76,101,0.5)] font-medium text-xs sm:text-sm uppercase tracking-[0.16em]"
              >
                Jetzt durchstarten
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

      {/* Newsletter Teaser - RED STRIPE */}
      <section className="py-20 bg-[#e44c65] text-center px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl font-light text-white mb-4 tracking-[0.16em] uppercase">
              Newsletter abonnieren
            </h2>
            <p className="text-white/90 mb-8 text-lg font-light tracking-wide">
              Bleib auf dem Laufenden über neue Kurse, Workshops und Konzerte.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-16">
              <input
                type="email"
                placeholder="Deine E-Mail Adresse"
                className="px-6 py-4 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-white/30 w-full shadow-lg"
              />
              <button type="submit" className="px-8 py-4 bg-white text-[#e44c65] font-medium uppercase tracking-[0.14em] text-sm rounded-full hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105">
                Anmelden
              </button>
            </form>

            <div className="border-t border-white/30 pt-10 mt-8">
              <p className="text-white/80 mb-8 font-medium tracking-[0.24em] uppercase text-xs">
                Folge mir auf Social Media
              </p>
              <div className="flex justify-center gap-8">
                <a href="https://instagram.com/santinoscavelli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                  <Instagram size={36} />
                </a>
                <a href="https://facebook.com/santinoscavelli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                  <Facebook size={36} />
                </a>
                <a href="https://youtube.com/@santinoscavelli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                  <Youtube size={36} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
                  <Linkedin size={36} />
                </a>
                <a href="https://tiktok.com/@santinoscavelli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-transform transform hover:scale-125 drop-shadow-lg">
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
