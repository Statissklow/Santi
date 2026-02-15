"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Instagram, Facebook, Youtube, Linkedin, Music } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-[family-name:var(--font-roboto)]">

      {/* 1. Banner Section */}
      <section id="banner" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with Blend Mode for depth */}
          <div className="absolute inset-0 bg-[#1c1d26]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c1d26]/50 to-[#1c1d26]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Text Side */}
            <div className="text-center md:text-right">
              <FadeIn direction="left" delay={0.2}>
                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
                  Santino Scavelli
                </h1>
              </FadeIn>
              <FadeIn direction="left" delay={0.4}>
                <p className="text-xl sm:text-2xl text-white/90 font-light tracking-widest uppercase mb-8">
                  Rhythm, Innovation, Tradition
                </p>
              </FadeIn>
            </div>

            {/* Profile Image Side */}
            <FadeIn direction="right" delay={0.4}>
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 rounded-full border-4 border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden bg-white/5 backdrop-blur-sm">
                <Image
                  src="/images/profil.png"
                  alt="Santino Scavelli Profil"
                  fill
                  className="object-contain scale-110 translate-y-2"
                />
              </div>
            </FadeIn>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 p-4">
            <button
              onClick={() => scrollToSection("videos")}
              className="animate-bounce text-white/50 hover:text-[#e44c65] transition-colors p-2"
            >
              <ChevronDown size={48} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Video Section (One) */}
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
          <header className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl font-bold text-white tracking-wide uppercase border-b-2 border-[#e44c65] inline-block pb-2 drop-shadow-lg">
                VIDEOS
              </h2>
            </FadeIn>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <FadeIn delay={0.1}>
              <div className="aspect-video bg-black shadow-2xl hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  width="100%" height="100%"
                  src="https://www.youtube.com/embed/_UdJSzDN3G4"
                  title="Video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </FadeIn>
            {/* Video 2 */}
            <FadeIn delay={0.2}>
              <div className="aspect-video bg-black shadow-2xl hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  width="100%" height="100%"
                  src="https://www.youtube.com/embed/eqL8RmaQTKw"
                  title="Video 2"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </FadeIn>
            {/* Video 3 */}
            <FadeIn delay={0.3}>
              <div className="aspect-video bg-black shadow-2xl hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  width="100%" height="100%"
                  src="https://www.youtube.com/embed/QphDrDJStWQ"
                  title="Video 3"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Logos Section */}
      <section className="bg-[#14151c] py-12 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            {/* Flex container to force single row on larger screens, wrap on tiny ones */}
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/Meinl II.png" alt="Meinl" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/tama.png" alt="Tama" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/evansII .png" alt="Evans" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/Audix.png" alt="Audix" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/Download (1).png" alt="Logo" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/Hoerluchs.png" alt="Hoerluchs" fill className="object-contain" /></div>
              <div className="h-10 relative w-32 shrink-0"><Image src="/images/zoomII.png" alt="Zoom" fill className="object-contain" /></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Feature Spotlights */}

      {/* About Santino - Text Left (Narrow), Image Right (Wide) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] bg-[#1c1d26] overflow-hidden">
        {/* Content Side - 4/12 width (33%) */}
        <div className="flex items-center p-8 lg:p-12 order-2 lg:order-1 lg:col-span-4 bg-[#1c1d26] relative z-20">
          <div className="w-full mr-auto text-left pl-4 lg:pl-0 lg:ml-0 xl:ml-0">
            <FadeIn direction="right">
              <h2 className="text-4xl font-bold text-white mb-6">Über Santino</h2>
              <p className="text-white/70 mb-4 leading-relaxed text-lg">
                Santino Scavelli ist einer der aufregendsten Newcomer der Weltmusik-Szene.
                Mit seinem einzigartigen Stil und Können hat er bereits mehrere renommierte
                Auszeichnungen erhalten.
              </p>
              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                Als Musical Director am Nationaltheater Mannheim und durch seine Zusammenarbeit
                mit internationalen Künstlern hat er weitreichende Anerkennung gefunden.
              </p>
              <Link href="/about" className="inline-block border border-[#e44c65] text-[#e44c65] px-8 py-3 rounded hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_15px_rgba(228,76,101,0.1)] hover:shadow-[0_0_25px_rgba(228,76,101,0.4)]">
                Mehr erfahren
              </Link>
            </FadeIn>
          </div>
        </div>
        {/* Image Side - 8/12 width (66%) */}
        <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2 lg:col-span-8">
          <Image
            src="/images/pic04.jpg"
            alt="Santino Live"
            fill
            className="object-cover"
          />
          {/* Gradient: From Left (matching text bg) to Right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1c1d26] via-[#1c1d26]/80 to-transparent lg:w-3/4 z-10" />
        </div>
      </section>

      {/* Recording - Text Right (Narrow), Image Left (Wide) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] bg-[#1e1f29] overflow-hidden">
        {/* Image Side - 8/12 width */}
        <div className="relative h-[50vh] lg:h-auto order-1 lg:col-span-8">
          <Image
            src="/images/pic11.jpg"
            alt="Recording"
            fill
            className="object-cover"
          />
          {/* Gradient: From Right (matching text bg) to Left (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#1e1f29] via-[#1e1f29]/80 to-transparent lg:w-3/4 lg:left-auto lg:right-0 z-10" />
        </div>
        {/* Content Side - 4/12 width */}
        <div className="flex items-center p-8 lg:p-12 order-2 lg:col-span-4 bg-[#1e1f29] relative z-20">
          <div className="w-full ml-auto text-left pr-4 lg:pr-0 lg:mr-0 xl:mr-0">
            <FadeIn direction="left">
              <h2 className="text-4xl font-bold text-white mb-6">Studio & Recording</h2>
              <p className="text-white/70 mb-4 leading-relaxed text-lg">
                Dein Sound. Professionell produziert. In Santinos Studio entstehen Aufnahmen
                für renommierte Künstler – egal ob Percussion, Drums oder beides.
              </p>
              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                Das Highlight: Sein selbstgebautes hybrides &quot;Split-Set&quot;, perfekt für organisch-elektronische Beats.
                Hol dir den fetten Sound für deine Produktion!
              </p>
              <Link href="/recording" className="inline-block border border-[#e44c65] text-[#e44c65] px-8 py-3 rounded hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_15px_rgba(228,76,101,0.1)] hover:shadow-[0_0_25px_rgba(228,76,101,0.4)]">
                Zum Studio
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lessons - Text Left (Narrow), Image Right (Wide) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] bg-[#1c1d26] overflow-hidden">
        {/* Content Side - 4/12 width */}
        <div className="flex items-center p-8 lg:p-12 order-2 lg:order-1 lg:col-span-4 bg-[#1c1d26] relative z-20">
          <div className="w-full mr-auto text-left pl-4 lg:pl-0 lg:ml-0 xl:ml-0">
            <FadeIn direction="right">
              <h2 className="text-4xl font-bold text-white mb-6">Unterricht</h2>
              <p className="text-white/70 mb-4 leading-relaxed text-lg font-medium text-white/90">
                Entfessle dein rhythmisches Potenzial!
              </p>
              <p className="text-white/70 mb-4 leading-relaxed text-lg">
                Egal ob blutiger Anfänger oder fortgeschrittener Profi – bei mir geht es nicht nur um Technik,
                sondern um <strong>Ausdruck, Groove und Leidenschaft</strong>.
              </p>
              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                Erlebe modernen Schlagzeug-Unterricht, der dich wirklich weiterbringt.
                Individuelles Coaching, praxisnahe Konzepte und der direkte Weg zu deinem eigenen Sound.
              </p>
              <Link href="/lessons" className="inline-block border border-[#e44c65] text-[#e44c65] px-8 py-3 rounded hover:bg-[#e44c65] hover:text-white transition-all shadow-[0_0_15px_rgba(228,76,101,0.1)] hover:shadow-[0_0_25px_rgba(228,76,101,0.4)]">
                Jetzt durchstarten
              </Link>
            </FadeIn>
          </div>
        </div>
        {/* Image Side - 8/12 width */}
        <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2 lg:col-span-8">
          <Image
            src="/images/pic03.jpg"
            alt="Lessons"
            fill
            className="object-cover"
          />
          {/* Gradient: From Left (matching text bg) to Right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1c1d26] via-[#1c1d26]/80 to-transparent lg:w-3/4 z-10" />
        </div>
      </section>

      {/* Newsletter Teaser - RED STRIPE */}
      <section className="py-20 bg-[#e44c65] text-center px-6 relative overflow-hidden">
        {/* Subtle pattern or noise could be added here specifically if needed, but global noise is active */}
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn direction="up">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Newsletter abonnieren</h2>
            <p className="text-white/90 mb-8 text-xl font-medium">
              Bleib auf dem Laufenden über neue Kurse, Workshops und Konzerte.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-16">
              <input
                type="email"
                placeholder="Deine E-Mail Adresse"
                className="px-6 py-4 rounded-full text-black focus:outline-none focus:ring-4 focus:ring-white/30 w-full shadow-lg"
              />
              <button type="submit" className="px-8 py-4 bg-white text-[#e44c65] font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105">
                Anmelden
              </button>
            </form>


            <div className="border-t border-white/30 pt-10 mt-8">
              <p className="text-white/80 mb-8 font-bold tracking-widest uppercase text-sm">Folge mir auf Social Media</p>
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
                {/* TikTok Placeholder (Music Icon) */}
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
