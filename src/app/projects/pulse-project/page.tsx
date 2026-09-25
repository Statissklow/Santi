import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PulseProject() {
    return (
        <ProjectPageLayout
            title="Pulse Project"
            subtitle="Faszinierende Fusion aus arabischer Melodik, westlicher Harmonik und rhythmischem Puls"
            kicker="Ensemble &amp; World Fusion"
            backHref="/#services"
            backLabel="← Zurück zur Übersicht"
            imageSrc="/images/_DSC1321.jpg"
            imageAlt="Pulse Project Band"
            videoSrc="https://www.youtube.com/embed/zBNyfipOFrU"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Kulturen im gemeinsamen Takt
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Im <strong>Pulse Project</strong> verschmelzen unterschiedliche Musikkulturen und Traditionen zu einem kraftvollen, unverwechselbaren Ensemble-Klang. Die kreativen Köpfe hinter der Formation sind Yazan Alsabbagh (Klarinette), Hesham Hamra (Oud) und Santino Scavelli (Schlagzeug).
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            Ihre Kompositionen verbinden die Eleganz und Tiefe arabischer Maqam-Musik mit der dynamischen Freiheit von Jazz, Progressive Rock und energetischen Groove-Konzepten.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* The Band */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                            <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                                Besetzung
                            </span>
                            <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                Die Band
                            </h4>
                            <ul className="space-y-3 text-sm sm:text-base font-light text-white/80">
                                {[
                                    { name: "Yazan Alsabbagh", instrument: "Klarinette" },
                                    { name: "Hesham Hamra", instrument: "Oud" },
                                    { name: "Santino Scavelli", instrument: "Schlagzeug & Percussion" },
                                    { name: "Simon Zauels", instrument: "E-Bass" },
                                    { name: "Andre Haaf", instrument: "Keyboard" },
                                    { name: "Julius Imhäuser", instrument: "Gitarre" },
                                ].map((m) => (
                                    <li key={m.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                                        <span className="text-white font-normal">{m.name}</span>
                                        <span className="text-white/40 text-xs sm:text-sm">{m.instrument}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Past Locations */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                            <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                                Konzertbühnen
                            </span>
                            <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                Bisherige Spielorte
                            </h4>
                            <div className="space-y-3 text-sm sm:text-base font-light text-white/80">
                                {[
                                    "Elbphilharmonie, Hamburg",
                                    "Fabrik, Hamburg",
                                    "Open Jazz Festival, Stuttgart",
                                    "Alte Feuerwache, Mannheim",
                                    "Planet Ears Festival",
                                ].map((loc) => (
                                    <div key={loc} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                                        <span className="w-2 h-2 rounded-full bg-[#e44c65]" />
                                        <span>{loc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
