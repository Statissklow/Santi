import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function MonkeyBeatz() {
    return (
        <ProjectPageLayout
            title="Monkey Beatz"
            subtitle="A creative studio laboratory for modern percussion experiments"
            kicker="Studio &amp; Experiment"
            backHref="/en#services"
            backLabel="← Back to Overview"
            imageSrc="/images/tobi.jpg"
            imageAlt="Monkey Beatz Studio"
            videoSrc="https://www.youtube.com/embed/oiPEmAeXYCY"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Just a Studio Experiment?
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            The <strong>Monkey Beatz</strong> project began in early 2020 as an open studio experiment. The vision was to establish an inspiring creative hub where fellow percussionists, producers, and guest musicians can explore new rhythmic territory.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            It also provides a dedicated space where I can work as a multi-instrumentalist, letting musical concepts and hybrid sound designs unfold without genre constraints.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Partnerships &amp; Gear
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-3">
                            Industry Collaborations
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed">
                            Support and interest from industry-leading companies such as <strong>Meinl Percussion</strong> and <strong>Zoom</strong> have accelerated the project, resulting in sound demos, educational sessions, and hybrid recordings.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 text-center">
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Interested in Collaborating?
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
                            I regularly collaborate with guest artists, filmmakers, and audio brands. Reach out if you have an idea in mind!
                        </p>
                        <a
                            href="mailto:info@santinoscavelli.de"
                            className="inline-block px-10 py-4 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-all font-medium text-xs sm:text-sm uppercase tracking-[0.16em] hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            }
        />
    );
}
