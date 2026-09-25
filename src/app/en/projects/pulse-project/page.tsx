import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PulseProject() {
    return (
        <ProjectPageLayout
            title="Pulse Project"
            subtitle="An electrifying fusion of Middle Eastern melodic traditions, Western harmony, and driving rhythmic groove"
            kicker="Ensemble &amp; World Fusion"
            backHref="/en#services"
            backLabel="← Back to Overview"
            imageSrc="/images/_DSC1321.jpg"
            imageAlt="Pulse Project Band"
            videoSrc="https://www.youtube.com/embed/zBNyfipOFrU"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Cultures in Shared Resonance
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            In <strong>Pulse Project</strong>, distinct musical backgrounds and stylistic heritages merge into an unmistakable, boundary-pushing ensemble voice. The creative core features Yazan Alsabbagh (clarinet), Hesham Hamra (oud), and Santino Scavelli (drums &amp; percussion).
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            Their original works bridge the microtonal beauty of classical Arabic Maqam traditions with the harmonic colors of contemporary jazz, progressive rock, and polyrhythmic grooves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* The Band */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                            <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                                Lineup
                            </span>
                            <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                The Band
                            </h4>
                            <ul className="space-y-3 text-sm sm:text-base font-light text-white/80">
                                {[
                                    { name: "Yazan Alsabbagh", instrument: "Clarinet" },
                                    { name: "Hesham Hamra", instrument: "Oud" },
                                    { name: "Santino Scavelli", instrument: "Drums & Percussion" },
                                    { name: "Simon Zauels", instrument: "Electric Bass" },
                                    { name: "Andre Haaf", instrument: "Keyboards" },
                                    { name: "Julius Imhäuser", instrument: "Guitar" },
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
                                Selected Stages
                            </span>
                            <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                                Past Venues &amp; Festivals
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
