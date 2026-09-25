import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PourLesAmis() {
    return (
        <ProjectPageLayout
            title="Pour les Amis"
            subtitle="Eine interkulturelle Konzertreihe in Kooperation mit der Stadt Mannheim und der Orientalischen Musikakademie"
            kicker="Konzertreihe &amp; Dialog"
            backHref="/#services"
            backLabel="← Zurück zur Übersicht"
            imageSrc="/images/tamburimundi.jpg"
            imageAlt="Pour les Amis Konzert"
            videoSrc="https://www.youtube.com/embed/xc_oh5g-C7M"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Verbindung durch Leidenschaft
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Was passiert, wenn Musikerinnen und Musiker unterschiedlichster kultureller Herkunft ohne Vorurteile und ohne vorheriges Kennenlernen aufeinandertreffen und spontan Musik kreieren?
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Die Konzertreihe <strong className="text-white font-medium">„Pour les Amis“</strong> (Für Freunde) ist ein von Santino Scavelli initiiertes Projekt in enger Kooperation mit dem Kulturamt der Stadt Mannheim und der Orientalischen Musikakademie Mannheim (OMM).
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            Wir schaffen einen geschützten Raum für Künstler, die sich musikalisch aufeinander einlassen und das Publikum auf eine unvorhersehbare, emotionale Klangreise mitnehmen.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Gastkünstler &amp; Ensembles
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                            Bisherige Gäste
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { name: "Ceyda Pirali", country: "Türkei" },
                                { name: "Gregory Dargent", country: "Frankreich" },
                                { name: "Annette Maye", country: "Deutschland" },
                                { name: "Arezoo Rezvani", country: "Iran" },
                                { name: "Max Clouth", country: "Deutschland" },
                            ].map((artist) => (
                                <div
                                    key={artist.name}
                                    className="px-5 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 text-sm font-light text-white/90"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#e44c65]" />
                                    <span className="font-normal">{artist.name}</span>
                                    <span className="text-white/40 text-xs uppercase tracking-wider">({artist.country})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
