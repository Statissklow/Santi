import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Music, Mail, ExternalLink } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen font-sans text-white">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 1: HERO                                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/Meinldrumfestival II.jpg"
                        alt="Santino Scavelli Live"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                        quality={90}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0f0f14] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/80 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.12em] sm:tracking-[0.18em] text-white mb-6 sm:mb-8 uppercase leading-tight whitespace-nowrap">
                        Santino Scavelli
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-light tracking-[0.24em] uppercase mb-4">
                        Hybrid Drummer · Split-Set Creator
                    </p>
                    <p className="text-xs sm:text-sm text-[#e44c65] font-medium tracking-[0.28em] uppercase">
                        Innovation through Tradition
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
                    <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 2: PHILOSOPHY / WHAT I STAND FOR                      */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="bg-[#0f0f14] py-28 sm:py-36 px-6 border-b border-white/5 relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#e44c65]/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header Statement */}
                    <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
                        <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.28em] mb-6 block">
                            Philosophy &amp; Vision
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.16em] uppercase mb-8">
                            What I Stand For
                        </h2>
                        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed tracking-wide">
                            &ldquo;Percussion is not an accessory &ndash;<br />
                            Percussion is a <span className="text-[#e44c65] font-normal">full-fledged instrument</span>.&rdquo;
                        </p>
                    </div>

                    {/* The Two Pillars: Tradition vs Technology */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 sm:mb-16">
                        {/* Pillar 1: Tradition */}
                        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm relative group">
                            <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold mb-4 block">
                                01 // Roots &amp; Heritage
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                                Tradition &amp; Organics
                            </h3>
                            <p className="text-white/40 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] mb-6">
                                Darbuka · Frame Drum · Cajón · Riq
                            </p>
                            <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                                Deeply rooted rhythms from the Mediterranean and the Orient. Centuries of rhythmic tradition where finger-control subtleties shape the raw pulse of music. Organic, dynamic, and breathing life.
                            </p>
                        </div>

                        {/* Pillar 2: Technology */}
                        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm relative group">
                            <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-semibold mb-4 block">
                                02 // Innovation &amp; Sound
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                                Technology &amp; Synthesis
                            </h3>
                            <p className="text-white/40 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] mb-6">
                                Synthesizers · Triggers · Drum Machines
                            </p>
                            <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                                Electronic sound synthesis, sub basses, and real-time modular textures. Rhythms are not just acoustically struck, but digitally transformed and expanded for modern club, theater, and concert stages.
                            </p>
                        </div>
                    </div>

                    {/* The Core Synthesis: Hybrid Drumming with Split-Set Image */}
                    <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1d26] to-[#12131a] border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                            {/* Text side */}
                            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-6 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e44c65]/15 border border-[#e44c65]/30 text-[#e44c65] text-xs uppercase tracking-[0.2em] font-medium">
                                    <span>The Fusion</span>
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-light uppercase tracking-[0.14em] text-white leading-tight">
                                    This is <span className="text-[#e44c65] font-normal">Hybrid Drumming</span>
                                </h3>
                                <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
                                    When Darbuka meets Drum Machine and Frame Drum meets Synthesizer, an unprecedented sonic universe unfolds.
                                </p>
                                <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                                    On my custom-built <strong className="text-white font-medium">Split-Set</strong>, I command both worlds simultaneously: acoustic world percussion with the left hand, electronic drops with the feet, and drumkit groove with the right hand.
                                </p>
                                <div className="pt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-white/60 font-light">
                                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Simultaneous Performance</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Custom Split-Set</span>
                                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Acoustic &amp; Digital</span>
                                </div>
                            </div>

                            {/* Image side */}
                            <div className="relative min-h-[350px] sm:min-h-[420px] lg:min-h-[500px] lg:col-span-6 h-full">
                                <Image
                                    src="/images/santino-hybrid-drumming.jpg"
                                    alt="Santino Scavelli – Hybrid Drumming &amp; Split-Set Setup"
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1c1d26] via-transparent to-transparent lg:w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 3: BIOGRAPHY                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="bg-[#14151c] py-28 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.26em] mb-6 sm:mb-8 block">
                                Journey &amp; Story
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-[0.14em] uppercase leading-tight mb-8">
                                Biography
                            </h2>
                        </div>
                        <div className="space-y-5 text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            <p>
                                I am Santino Scavelli – <span className="text-white font-medium">Hybrid Drummer</span> and{" "}
                                <span className="text-white font-medium">Musical Director at Nationaltheater Mannheim.</span>
                            </p>
                            <p>
                                I fuse Oriental and Latin American percussion with drumset and electronics.
                                To achieve this, I built my own instrument: the{" "}
                                <span className="text-[#e44c65] font-medium">Split-Set</span> – a setup uniting Darbuka,
                                Frame Drums, Drumkit, and Synthesizers.
                            </p>
                            <p>
                                <span className="text-white/50 font-medium text-xs sm:text-sm uppercase tracking-widest block mb-1">Education:</span>{" "}
                                State University of Music Trossingen (Drums &amp; Latin Percussion with Klaus Heßler and José Cortijo) +
                                Popakademie Mannheim (World Music &amp; Oriental Percussion with Murat Coşkun and Firas Hassan).
                            </p>
                            <p>
                                I record in my private studio{" "}
                                <span className="text-white font-medium">DrumHub</span> in Mannheim, perform with{" "}
                                <span className="text-white font-medium">Anika Nilles (Nevell)</span>, direct the{" "}
                                <span className="text-white font-medium">Pulse Project</span>, and founded the
                                intercultural concert series{" "}
                                <span className="text-white font-medium">Pour Les Amis</span>.
                            </p>
                            <p>
                                Born in Southern Italy, raised between rhythms and diverse cultures – today I bridge worlds:
                                between East and West, analog and digital, between{" "}
                                <span className="text-[#e44c65] font-medium">tradition and innovation</span>.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/images/meinldrumfestival.jpg"
                            alt="Santino Scavelli Live at Meinl Drum Festival"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 4: PRESS, MEDIA & CONTACT                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="bg-[#0f0f14] py-28 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.26em] mb-6 sm:mb-8 block">
                            Inquiries &amp; Downloads
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.16em] uppercase">
                            Press &amp; Contact
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Press */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col justify-between hover:border-white/20 transition-all">
                            <div>
                                <span className="text-[#e44c65] text-xs uppercase tracking-[0.24em] font-medium mb-3 block">
                                    Downloads
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                    Press &amp; EPK
                                </h3>
                                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 font-light">
                                    High-resolution press photos, biography, logo package, technical rider, and hospitality rider ready for promoters and media.
                                </p>
                            </div>
                            <div>
                                <a
                                    href="https://drive.google.com/drive/folders/1owr1J6ocqJBIWBRMau5MmSPJ9KNG-syn?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 bg-[#e44c65] text-white font-medium uppercase tracking-[0.16em] text-xs sm:text-sm rounded-full hover:bg-[#c43c52] transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(228,76,101,0.35)]"
                                >
                                    <span>Open Press Drive</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 hover:border-white/20 transition-all">
                            <div>
                                <span className="text-[#e44c65] text-xs uppercase tracking-[0.24em] font-medium mb-3 block">
                                    Get in Touch
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                    Contact
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 font-medium">
                                        Booking &amp; General Inquiries
                                    </p>
                                    <a
                                        href="mailto:info@santinoscavelli.de"
                                        className="text-white text-lg font-light hover:text-[#e44c65] transition-colors flex items-center gap-2.5"
                                    >
                                        <Mail size={18} className="text-[#e44c65]" />
                                        <span>info@santinoscavelli.de</span>
                                    </a>
                                </div>

                                <div>
                                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2 font-medium">
                                        Remote Recording &amp; Studio
                                    </p>
                                    <a
                                        href="mailto:recording@santinoscavelli.de"
                                        className="text-white text-lg font-light hover:text-[#e44c65] transition-colors flex items-center gap-2.5"
                                    >
                                        <Mail size={18} className="text-[#e44c65]" />
                                        <span>recording@santinoscavelli.de</span>
                                    </a>
                                </div>

                                <div className="pt-2 border-t border-white/10">
                                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">
                                        Social Media
                                    </p>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://instagram.com/santinoscavelli"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Instagram"
                                            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-[#e44c65] hover:border-[#e44c65] transition-all duration-300 hover:scale-110"
                                        >
                                            <Instagram size={20} />
                                        </a>
                                        <a
                                            href="https://youtube.com/@santinoscavelli"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="YouTube"
                                            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-[#e44c65] hover:border-[#e44c65] transition-all duration-300 hover:scale-110"
                                        >
                                            <Youtube size={20} />
                                        </a>
                                        <a
                                            href="https://facebook.com/santinoscavelli"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Facebook"
                                            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-[#e44c65] hover:border-[#e44c65] transition-all duration-300 hover:scale-110"
                                        >
                                            <Facebook size={20} />
                                        </a>
                                        <a
                                            href="https://tiktok.com/@santinoscavelli"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="TikTok"
                                            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-[#e44c65] hover:border-[#e44c65] transition-all duration-300 hover:scale-110"
                                        >
                                            <Music size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 5: AWARDS, ACCOMPLISHMENTS & STAGES                   */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="bg-[#14151c] py-28 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.26em] mb-6 sm:mb-8 block">
                            Milestones &amp; Recognition
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.16em] uppercase">
                            Awards &amp; Stages
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Awards */}
                        <div>
                            <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.26em] mb-4 block">
                                Awards
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-[0.12em] uppercase mb-8">
                                Awards
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { year: "2023", award: "Meinl Outstanding Performance Award" },
                                    { year: "2019", award: "YouTube Early Career Award" },
                                    { year: "2018", award: "Frame Drum Award" },
                                ].map((item) => (
                                    <div
                                        key={item.year}
                                        className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
                                    >
                                        <span className="text-[#e44c65] font-light text-2xl tracking-[0.12em] min-w-[4rem]">{item.year}</span>
                                        <span className="text-white/90 font-light text-base sm:text-lg">{item.award}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stages */}
                        <div>
                            <span className="text-[#e44c65] text-xs sm:text-sm font-medium uppercase tracking-[0.26em] mb-4 block">
                                Live
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-[0.12em] uppercase mb-8">
                                Stages <span className="text-white/30 text-base font-light tracking-normal lowercase">(Selected)</span>
                            </h3>
                            <div className="space-y-3">
                                {[
                                    "UK Drum Show 2024 (Main Stage)",
                                    "Elbphilharmonie Hamburg",
                                    "Jazzopen Stuttgart",
                                    "JazzandJoy Worms",
                                    "Tollhaus Karlsruhe",
                                    "Tamburi Mundi Freiburg",
                                    "Nationaltheater Mannheim",
                                ].map((stage) => (
                                    <div
                                        key={stage}
                                        className="flex items-center gap-4 py-3.5 px-5 border-l-2 border-[#e44c65]/40 hover:border-[#e44c65] hover:bg-white/5 rounded-r-xl transition-all"
                                    >
                                        <span className="text-white/80 font-light text-base sm:text-lg">{stage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
