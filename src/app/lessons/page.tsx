"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const subjects = [
    {
        emoji: "🥁",
        title: "Schlagzeug",
        description:
            "Technik, Micro-Timing, Groove, Blattspiel und musikalischer Ausdruck. Rock, Pop, Jazz, Funk und Latin – stilistisch vielseitig aufgestellt.",
        level: "Anfänger bis Profis",
        details: [
            "Hand- & Fußtechnik, Rudiments & Sticking-Patterns",
            "Groove, Pocket & Time-Feel in diversen Stilen",
            "Blattspiel, Rhythmusnotation & Chart-Reading",
            "Dynamische Bandbreite, Sound & musikalischer Ausdruck",
            "Individuelle Song- und Repertoire-Arbeit",
        ],
    },
    {
        emoji: "🪘",
        title: "Latin Percussion",
        description:
            "Congas, Bongos, Timbales und Cajón. Authentische afro-kubanische und brasilianische Rhythmen, gesunde Schlagtechnik und echtes Clave-Gefühl.",
        level: "Anfänger bis Fortgeschrittene",
        details: [
            "Grundschläge (Open, Slap, Heel-Toe, Bass) & gelenkschonende Technik",
            "Afro-kubanische Rhythmen (Son, Rumba, Guaguancó, Mambo)",
            "Brasilianische Rhythmik (Samba, Bossa Nova, Partido Alto)",
            "Cajón für Akustik-Sessions, Songwriter & Bandkontexte",
            "Unabhängigkeit, Ensemblespiel & Polyrhythmik",
        ],
    },
    {
        emoji: "🪘",
        title: "Orientalische Percussion",
        description:
            "Darbuka, Riq, Frame Drum (Rahmentrommel) und Tamburello. Arabische, türkische und süditalienische Traditionen von Grundmustern bis zu Solokonzepten.",
        level: "Anfänger bis Fortgeschrittene",
        details: [
            "Darbuka-Grundschläge (Dum, Tek, Ka) & Finger-Splitting-Technik",
            "Arabische Maqam-Rhythmen (Malfuf, Maqsum, Saidi)",
            "Türkische Rhythmen & ungerade Taktarten (Aksak 7/8, 9/8)",
            "Frame Drum Techniken (Lap Style & Upright)",
            "Süditalienische Rahmentrommel-Traditionen (Taranta, Pizzica)",
        ],
    },
    {
        emoji: "⚡",
        title: "Hybrid Setup & Split-Set",
        description:
            "Lerne mein innovatives Split-Set kennen: Wie man akustisches Schlagzeug, Handpercussion und elektronische Soundmodule in ein stimmiges Live-Setup integriert.",
        level: "Fortgeschrittene bis Profis",
        details: [
            "Split-Set Philosophie & Ergonomie des Setups",
            "Signal-Routing, Triggering & Midi-Verdrahtung",
            "Live-Looping mit Ableton Live & Hardware-Loopern",
            "Integration von Pads, Samples & analogen Percussion-Synths",
            "Sounddesign, Effekt-Ketten & Live-Performance-Konzepte",
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
                        Zielgruppe: {subject.level}
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
                        Inhalte &amp; Schwerpunkte
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
            {/* SEKTION 1: HERO                                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/Santi at meinl Perc shoot 2024.jpg"
                        alt="Santino Scavelli beim Unterrichten"
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
                        Unterricht &amp;<br />
                        <span className="text-[#e44c65]">Mentoring</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light tracking-[0.2em] uppercase mb-4">
                        Drums · Latin · Oriental · Hybrid
                    </p>
                    <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
                        Rhythmen, die du an keiner Musikschule lernst.
                    </p>
                    <p className="text-sm sm:text-base text-white/60 font-light mb-6">
                        Im DrumHub Studio Mannheim oder weltweit online via Zoom.
                    </p>
                    <p className="text-xs sm:text-sm text-white/40 tracking-wider uppercase font-light mb-12">
                        15+ Jahre Bühne, Studio &amp; Lehre · Meinl Artist · Musical Director am Nationaltheater
                    </p>
                    <a
                        href="mailto:info@santinoscavelli.de?subject=Probestunde"
                        className="inline-block px-10 py-4 bg-[#e44c65] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                    >
                        Kostenlose Probestunde buchen
                    </a>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
                    <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 2: WAS DICH ERWARTET                                 */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                        Mein Ansatz
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white mb-10">
                        Was dich erwartet
                    </h2>
                    <div className="text-base sm:text-lg lg:text-xl text-white/75 font-light leading-relaxed space-y-6 mb-12 max-w-3xl mx-auto">
                        <p>
                            Kein Schema-F-Unterricht. Ich passe jede Session an dein{" "}
                            <span className="text-white font-normal">Level, deine Inspiration und deine individuellen Ziele</span> an.
                        </p>
                        <p>
                            Du willst solide Latin-Grooves meistern? Orientalische Handtechnik lernen? Oder ein eigenes Hybrid-Setup bauen?
                            Egal wo du stehst –{" "}
                            <span className="text-[#e44c65] font-normal">wir arbeiten gezielt an DEINEM unverwechselbaren Sound.</span>
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
                                Online via Zoom (Weltweit)
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 3: FÄCHER                                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Angebot &amp; Schwerpunkte
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Fächer
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-4">
                            Klicke auf ein Fach, um detaillierte Lehrinhalte und Methoden einzusehen.
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
            {/* SEKTION 4: PREISE                                             */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Investition
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Preise
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto mt-4">
                            Faire und transparente Konditionen für wöchentlichen Unterricht oder flexible Mehrfachkarten.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Probestunde", price: "Kostenlos", note: "60 Minuten unverbindlich", highlight: true },
                            { label: "Einzelstunde", price: "60 €", note: "60 Minuten Vor-Ort" },
                            { label: "Online-Stunde", price: "50 €", note: "60 Minuten via Zoom" },
                            { label: "5er-Karte", price: "275 €", note: "55 € pro Unterrichtsstunde" },
                            { label: "10er-Karte", price: "500 €", note: "50 € pro Unterrichtsstunde" },
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
                                        href="mailto:info@santinoscavelli.de?subject=Probestunde"
                                        className="w-full py-3.5 px-6 bg-[#e44c65] text-white font-medium text-xs uppercase tracking-[0.16em] rounded-full hover:bg-[#c43c52] transition-all hover:scale-105 shadow-[0_0_20px_rgba(228,76,101,0.35)]"
                                    >
                                        Jetzt anfragen →
                                    </a>
                                ) : (
                                    <a
                                        href="mailto:info@santinoscavelli.de?subject=Unterrichtsanfrage"
                                        className="w-full py-3 px-6 bg-white/5 border border-white/15 text-white/80 font-medium text-xs uppercase tracking-[0.16em] rounded-full hover:bg-white/10 hover:text-white transition-all text-center"
                                    >
                                        Buchen
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center text-center">
                        <span className="text-white/40 text-xs sm:text-sm font-light tracking-wider">
                            📍 Unterrichtsort: DrumHub Studio, Mannheim
                        </span>
                        <span className="hidden sm:block text-white/20">·</span>
                        <span className="text-white/40 text-xs sm:text-sm font-light tracking-wider">
                            💻 Online via Zoom weltweit
                        </span>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 5: FÜR WEN                                            */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Zielgruppe
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Für wen ist das?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: "🎯",
                                title: "Anfänger",
                                text: "Du möchtest Schlagzeug oder Percussion von Grund auf lernen und suchst einen Lehrer mit ansteckender Motivation und fundierter Methodik.",
                            },
                            {
                                icon: "⚡",
                                title: "Fortgeschrittene",
                                text: "Du spielst bereits und möchtest stilistisch vielseitiger werden: Latin, Oriental, ungerade Taktarten, Micro-Timing und neue musikalische Ideen.",
                            },
                            {
                                icon: "🚀",
                                title: "Profis & Studios",
                                text: "Du möchtest dein Live-Setup erweitern, innovative Hybrid-Techniken lernen oder an spezifischen Recording-Skills feilen. Auf Masterclass-Niveau.",
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
            {/* SEKTION 6: TESTIMONIALS                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-28 sm:py-36 px-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 sm:mb-24">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                            Feedback
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.14em] text-white">
                            Erfahrungsberichte
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {[
                            {
                                quote: "Santino vermittelt komplexe Techniken so klar und motivierend, dass jede Stunde gleichermaßen Freude macht und echten musikalischen Fortschritt bringt.",
                                name: "Alex M.",
                                level: "Schlagzeug · Fortgeschritten",
                            },
                            {
                                quote: "Ich hatte vorher keine Erfahrung mit der Darbuka – nach wenigen Monaten beherrsche ich die Grundtechniken und spiele erste Soli. Santinos Geduld ist großartig.",
                                name: "Leila K.",
                                level: "Orientalische Percussion · Anfänger",
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
            {/* SEKTION 7: STUDENT PORTAL HINWEIS                            */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-28 px-6 bg-[#0c0c10] border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-[#e44c65]/[0.08] to-white/[0.03] border border-[#e44c65]/30 rounded-3xl p-8 sm:p-12 text-center">
                        <span className="text-3xl mb-4 block">🎓</span>
                        <span className="text-xs uppercase tracking-[0.26em] text-[#e44c65] font-medium block mb-3">
                            Digital Hub
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase tracking-[0.14em] mb-4">
                            Schon Schüler?
                        </h2>
                        <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto">
                            Im Student Portal findest du alle deine Übungsmaterialien, Playalongs, Transkriptionen und Notizen – übersichtlich an einem Ort.
                        </p>
                        <Link
                            href="/portal"
                            className="inline-block px-8 py-3.5 bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-[0.16em] rounded-full hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105"
                        >
                            Zum Student Portal →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SEKTION 8: FINALER CTA                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e44c65]/15 via-[#0f0f14] to-[#0f0f14]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#e44c65]/10 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-6">
                        Kontakt &amp; Buchung
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-light tracking-[0.16em] text-white mb-6 uppercase leading-tight">
                        Lust bekommen?
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 font-light max-w-xl mx-auto">
                        Die erste Probestunde ist{" "}
                        <span className="text-white font-normal">kostenlos</span>.{" "}
                        Schreib mir eine Nachricht und wir finden einen passenden Termin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:info@santinoscavelli.de?subject=Probestunde"
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
                            Direkt buchen (Calendly)
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
