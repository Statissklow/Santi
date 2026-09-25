"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const subjects = [
    {
        emoji: "🥁",
        title: "Drum Set",
        description:
            "Technique, micro-timing, groove, chart reading, and musical expression. Rock, pop, jazz, funk, and Latin – stylistically versatile and musically focused.",
        level: "Beginners to Advanced & Pros",
        details: [
            "Hand & foot technique, rudiments & sticking concepts",
            "Groove, pocket & time-feel across varied genres",
            "Sight-reading, rhythmic notation & chart interpretation",
            "Dynamic control, tonal balance & touch",
            "Custom repertoire, song preparation & live performance",
        ],
    },
    {
        emoji: "🪘",
        title: "Latin Percussion",
        description:
            "Congas, bongos, timbales, and cajón. Authentic Afro-Cuban and Brazilian rhythms, ergonomic hand techniques, and genuine clave awareness.",
        level: "Beginners to Advanced",
        details: [
            "Fundamental tones (Open, Slap, Heel-Toe, Bass) with healthy ergonomics",
            "Afro-Cuban rhythms (Son, Rumba, Guaguancó, Mambo)",
            "Brazilian styles (Samba, Bossa Nova, Partido Alto)",
            "Cajón for singer-songwriter & contemporary acoustic setups",
            "Interdependence, polyrhythms & ensemble playing",
        ],
    },
    {
        emoji: "🪘",
        title: "Middle Eastern & Mediterranean Percussion",
        description:
            "Darbuka, riq, frame drum, and tamburello. Arabic, Turkish, and Southern Italian rhythmic traditions from foundational patterns to modern soloing.",
        level: "Beginners to Advanced",
        details: [
            "Darbuka fundamentals (Dum, Tek, Ka) & finger-splitting techniques",
            "Arabic Maqam rhythms (Malfuf, Maqsum, Saidi)",
            "Turkish odd-meter rhythms (Aksak 7/8, 9/8)",
            "Frame drum styles (Lap style & Upright)",
            "Southern Italian frame drum traditions (Taranta, Pizzica)",
        ],
    },
    {
        emoji: "⚡",
        title: "Hybrid Drumming & Split-Set",
        description:
            "Discover Santino's innovative Split-Set concept: Combining acoustic drums, hand percussion, and electronic sound modules into one coherent performance rig.",
        level: "Intermediate to Professional",
        details: [
            "Split-Set philosophy & ergonomic setup architecture",
            "Signal routing, hybrid triggering & MIDI integration",
            "Live looping using Ableton Live & hardware pedals",
            "Integrating percussion synths, triggers, and sample pads",
            "Live sound design, FX routing & performance concepts",
        ],
    },
];

function SubjectCard({ subject }: { subject: typeof subjects[0] }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`group bg-white/[0.03] border rounded-3xl p-8 sm:p-9 cursor-pointer transition-all duration-300 ${
                open
                    ? "border-[#e44c65]/60 bg-[#e44c65]/[0.05] shadow-[0_0_35px_rgba(228,76,101,0.12)]"
                    : "border-white/10 hover:border-white/25"
            }`}
            onClick={() => setOpen(!open)}
        >
            <div className="flex items-start justify-between gap-6">
                <div>
                    <span className="text-3xl mb-4 block">{subject.emoji}</span>
                    <h3 className="text-white font-light text-xl sm:text-2xl uppercase tracking-[0.14em] mb-3">
                        {subject.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-4">
                        {subject.description}
                    </p>
                    <span className="inline-block text-[#e44c65] text-xs font-medium uppercase tracking-[0.24em]">
                        Level: {subject.level}
                    </span>
                </div>
                <span
                    className={`text-white/40 text-2xl mt-1 flex-shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45 text-[#e44c65]" : "group-hover:text-white"
                    }`}
                >
                    +
                </span>
            </div>

            {open && (
                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white/40 text-xs uppercase tracking-[0.24em] font-medium mb-4">
                        Key Topics &amp; Methods
                    </p>
                    <ul className="space-y-3">
                        {subject.details.map((d) => (
                            <li key={d} className="flex items-start gap-3 text-white/80 text-sm font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e44c65] mt-2 flex-shrink-0" />
                                <span>{d}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function Lessons() {
    return (
        <div className="min-h-screen font-sans text-white bg-[#0f0f14]">

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 1: HERO                                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/Santi at meinl Perc shoot 2024.jpg"
                        alt="Santino Scavelli teaching percussion"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0f0f14] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/80 to-transparent z-10 pointer-events-none" />
                </div>

                <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-20">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Mannheim &amp; Online
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.16em] text-white mb-8 leading-[1.08] uppercase">
                        Lessons &amp;<br />
                        <span className="text-[#e44c65]">Mentoring</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light tracking-[0.2em] uppercase mb-4">
                        Drums · Latin · Oriental · Hybrid
                    </p>
                    <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
                        Rhythms and concepts rarely taught in conventional music schools.
                    </p>
                    <p className="text-sm sm:text-base text-white/60 font-light mb-6">
                        In person at DrumHub Studio Mannheim or worldwide online via Zoom.
                    </p>
                    <p className="text-xs sm:text-sm text-white/40 tracking-wider uppercase font-light mb-12">
                        15+ years stage, studio &amp; teaching · Meinl Artist · Musical Director at Nationaltheater
                    </p>
                    <a
                        href="mailto:info@santinoscavelli.de?subject=Trial Lesson"
                        className="inline-block px-10 py-4 bg-[#e44c65] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                    >
                        Book Free Trial Lesson
                    </a>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
                    <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 2: PHILOSOPHY / APPROACH                              */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                        Philosophy &amp; Method
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white mb-10">
                        What to Expect
                    </h2>
                    <div className="text-base sm:text-lg lg:text-xl text-white/75 font-light leading-relaxed space-y-6 mb-12 max-w-3xl mx-auto">
                        <p>
                            No rigid, one-size-fits-all curriculum. Each lesson is tailored specifically around your{" "}
                            <span className="text-white font-normal">current level, musical influences, and personal goals</span>.
                        </p>
                        <p>
                            Whether you want to refine micro-timing on the kit, dive into authentic Afro-Cuban clave rhythms, master Middle Eastern finger technique, or build your own hybrid rig:{" "}
                            <span className="text-[#e44c65] font-normal">we work directly on YOUR distinct musical identity.</span>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 rounded-full px-8 py-4">
                            <span className="text-xl">📍</span>
                            <span className="text-white/80 font-light text-sm uppercase tracking-[0.14em]">
                                DrumHub Studio, Mannheim
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 rounded-full px-8 py-4">
                            <span className="text-xl">💻</span>
                            <span className="text-white/80 font-light text-sm uppercase tracking-[0.14em]">
                                Online via Zoom (Worldwide)
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 3: CURRICULUM / SUBJECTS                              */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Curriculum &amp; Focus
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Subjects
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-4">
                            Click on any discipline to view specific topics, techniques, and learning goals.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {subjects.map((s) => (
                            <SubjectCard key={s.title} subject={s} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 4: RATES & PRICING                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Investment
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Pricing
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-4">
                            Transparent terms for recurring lessons or flexible multi-lesson discount passes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Trial Lesson", price: "Free", note: "60 minutes obligation-free", highlight: true },
                            { label: "Single Lesson", price: "€60", note: "60 minutes in-studio" },
                            { label: "Online Lesson", price: "€50", note: "60 minutes via Zoom" },
                            { label: "5-Lesson Pass", price: "€275", note: "€55 per hour" },
                            { label: "10-Lesson Pass", price: "€500", note: "€50 per hour" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                                    item.highlight
                                        ? "bg-[#e44c65]/[0.08] border-[#e44c65]/50 shadow-[0_0_40px_rgba(228,76,101,0.2)] col-span-full sm:col-span-2 lg:col-span-1 text-center items-center"
                                        : "bg-white/[0.03] border-white/10 hover:border-white/20"
                                }`}
                            >
                                <div className="w-full mb-6">
                                    <p className={`text-xs font-medium uppercase tracking-[0.24em] mb-3 ${
                                        item.highlight ? "text-[#e44c65]" : "text-white/40"
                                    }`}>
                                        {item.label}
                                    </p>
                                    <p className={`text-3xl sm:text-4xl font-light tracking-wider mb-2 ${
                                        item.highlight ? "text-white" : "text-white"
                                    }`}>
                                        {item.price}
                                    </p>
                                    <p className="text-white/50 text-xs sm:text-sm font-light">{item.note}</p>
                                </div>
                                {item.highlight ? (
                                    <a
                                        href="mailto:info@santinoscavelli.de?subject=Trial Lesson Request"
                                        className="w-full py-3.5 px-6 bg-[#e44c65] text-white font-medium text-xs uppercase tracking-[0.16em] rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_20px_rgba(228,76,101,0.35)]"
                                    >
                                        Book Trial Now →
                                    </a>
                                ) : (
                                    <a
                                        href="mailto:info@santinoscavelli.de?subject=Lesson Inquiry"
                                        className="w-full py-3 px-6 bg-white/5 border border-white/15 text-white/80 font-medium text-xs uppercase tracking-[0.16em] rounded-full hover:bg-white/10 hover:text-white transition-all text-center"
                                    >
                                        Book
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center text-center">
                        <span className="text-white/40 text-xs sm:text-sm font-light tracking-wider">
                            📍 Studio Location: DrumHub Studio, Mannheim
                        </span>
                        <span className="hidden sm:block text-white/20">·</span>
                        <span className="text-white/40 text-xs sm:text-sm font-light tracking-wider">
                            💻 Online via Zoom worldwide
                        </span>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 5: AUDIENCE / WHO IS THIS FOR                         */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Target Audience
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Who Is This For?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: "🎯",
                                title: "Beginners",
                                text: "You want to learn drums or percussion from the ground up with a mentor who blends inspiring enthusiasm with sound pedagogical fundamentals.",
                            },
                            {
                                icon: "⚡",
                                title: "Intermediate",
                                text: "You already play and want to broaden your stylistic horizon: Latin, Middle Eastern rhythms, odd meters, micro-timing, and fresh creative concepts.",
                            },
                            {
                                icon: "🚀",
                                title: "Pros & Recording Artists",
                                text: "You are looking to expand your setup with hybrid techniques, polish live electronics, or work on studio-specific groove recording skills at a masterclass level.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 text-center hover:border-white/20 transition-all duration-300"
                            >
                                <span className="text-3xl mb-6 block">{item.icon}</span>
                                <h3 className="text-white font-light text-xl uppercase tracking-[0.14em] mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 6: TESTIMONIALS                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Feedback
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Student Testimonials
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {[
                            {
                                quote: "Santino breaks down intricate polyrhythmic techniques with such clarity and encouragement that every session is both thoroughly inspiring and immensely productive.",
                                name: "Alex M.",
                                level: "Drum Set · Advanced",
                            },
                            {
                                quote: "I had zero previous experience with the darbuka. Within a few months, I had the fundamental strokes down and was playing my first solos. Santino's patience is incredible.",
                                name: "Leila K.",
                                level: "Middle Eastern Percussion · Beginner",
                            },
                        ].map((t) => (
                            <div
                                key={t.name}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                            >
                                <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed italic mb-8">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div>
                                    <p className="text-white font-normal uppercase tracking-[0.12em] text-sm sm:text-base">{t.name}</p>
                                    <p className="text-white/40 text-xs tracking-wider mt-1 font-light">{t.level}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 7: STUDENT PORTAL HIGHLIGHT                           */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-28 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-[#e44c65]/[0.08] to-white/[0.03] border border-[#e44c65]/30 rounded-3xl p-8 sm:p-12 text-center">
                        <span className="text-3xl mb-4 block">🎓</span>
                        <span className="text-xs uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-3">
                            Digital Hub
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase tracking-[0.14em] mb-4">
                            Already a Student?
                        </h2>
                        <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto">
                            Access all your practice sheets, playalongs, transcriptions, and session notes in the student portal – organized in one place.
                        </p>
                        <Link
                            href="/en/portal"
                            className="inline-block px-8 py-3.5 bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105"
                        >
                            Open Student Portal →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SECTION 8: FINAL CTA                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e44c65]/15 via-[#0f0f14] to-[#0f0f14]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#e44c65]/10 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Contact &amp; Booking
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-light tracking-[0.16em] text-white mb-6 uppercase leading-tight">
                        Ready to Start?
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 font-light max-w-xl mx-auto">
                        Your first trial lesson is completely{" "}
                        <span className="text-white font-normal">free</span>.{" "}
                        Send me a message and let&apos;s schedule a session.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:info@santinoscavelli.de?subject=Trial Lesson"
                            className="px-8 sm:px-10 py-4 bg-[#e44c65] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_35px_rgba(228,76,101,0.4)]"
                        >
                            info@santinoscavelli.de
                        </a>
                        <a
                            href="https://calendly.com/santinoscavelli"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 sm:px-10 py-4 bg-white/5 border border-white/15 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
                        >
                            Book via Calendly
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
