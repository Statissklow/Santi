import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PourLesAmis() {
    return (
        <ProjectPageLayout
            title="Pour les Amis"
            subtitle="An intercultural concert series in collaboration with the City of Mannheim and the Oriental Music Academy"
            kicker="Concert Series &amp; Cultural Dialogue"
            backHref="/en#services"
            backLabel="← Back to Overview"
            imageSrc="/images/tamburimundi.jpg"
            imageAlt="Pour les Amis Concert"
            videoSrc="https://www.youtube.com/embed/xc_oh5g-C7M"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Communicating through Musical Passion
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            What happens when musicians from completely different cultural backgrounds meet on stage without preconceived notions and begin making music together spontaneously?
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            The concert series <strong className="text-white font-medium">&quot;Pour les Amis&quot;</strong> (For Friends) is initiated by Santino Scavelli in close cooperation with the City of Mannheim Cultural Department and the Oriental Music Academy Mannheim (OMM).
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            We cultivate a protected artistic space where performers entrust themselves to each other, inviting audiences into an unpredictable and emotionally charged sonic encounter.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Featured Artists &amp; Ensembles
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-6">
                            Past Guest Artists
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { name: "Ceyda Pirali", country: "Turkey" },
                                { name: "Gregory Dargent", country: "France" },
                                { name: "Annette Maye", country: "Germany" },
                                { name: "Arezoo Rezvani", country: "Iran" },
                                { name: "Max Clouth", country: "Germany" },
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
