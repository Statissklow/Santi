import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function MonkeyBeatz() {
    return (
        <ProjectPageLayout
            title="Monkey Beatz"
            subtitle="Ein Studio-Experiment für kreative Percussion-Kollaborationen"
            kicker="Studio &amp; Experiment"
            backHref="/#services"
            backLabel="← Zurück zur Übersicht"
            imageSrc="/images/tobi.jpg"
            imageAlt="Monkey Beatz Studio"
            videoSrc="https://www.youtube.com/embed/oiPEmAeXYCY"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Mehr als nur ein Experiment
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Das Projekt <strong>Monkey Beatz</strong> startete Anfang 2020 als intuitives Studio-Laboratorium. Das Ziel: ein inspirierender kreativer Raum für Perkussionisten, Produzenten und befreundete Musiker.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            Hier kann ich mich als Multi-Instrumentalist und Sounddesigner frei entfalten, unkonventionelle Rhythmen ausprobieren und neue klangliche Brücken zwischen Akustik und Elektronik schlagen.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Partnerschaften &amp; Equipment
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-3">
                            Kollaborationen
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed">
                            Das rege Interesse renommierter Marken wie <strong>Meinl Percussion</strong> oder <strong>Zoom</strong> hat dem Projekt von Beginn an zusätzliche Dynamik verliehen. Hier entstehen regelmäßig Sound-Demos, Playalongs und innovative Recording-Sessions.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 text-center">
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Interesse an einer Zusammenarbeit?
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
                            Ich erhalte regelmäßig Anfragen für gemeinsame Sessions, Sounddesign und Video-Kollaborationen. Schreib mir gerne!
                        </p>
                        <a
                            href="mailto:info@santinoscavelli.de"
                            className="inline-block px-10 py-4 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-all font-medium text-xs sm:text-sm uppercase tracking-[0.16em] hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Kontakt aufnehmen
                        </a>
                    </div>
                </div>
            }
        />
    );
}
