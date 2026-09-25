import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function TambourDuo() {
    return (
        <ProjectPageLayout
            title="Tambour Duo / Quartet"
            subtitle="Conceived as an intimate duo, now expanding its sonic boundaries as a quartet"
            kicker="Ensemble &amp; Dialogue"
            backHref="/en#services"
            backLabel="← Back to Overview"
            imageSrc="/images/Tmbour.jpg"
            imageAlt="Tambour Duo / Quartet"
            videoSrc="https://www.youtube.com/embed/6HTHxZ1uv2M"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Sonic Landscapes between Orient &amp; Occident
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            The <strong>Tambour Quartet</strong>, born originally as an acoustic duo, continuously explores fresh sonic territories and musical traditions.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            An earthy, resonant sound that flows effortlessly between Middle Eastern rhythmic complexity, lyrical jazz improvisation, and the raw feeling of the blues – mirroring the international roots of its ensemble members.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            At times intimate and whisper-quiet, at others percussive, driving, and fierce: a rich tapestry of stylistic colors woven together into a unified artistic voice.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 text-center">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Booking &amp; Performances
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Experience Tambour Live
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
                            For concert bookings, festival appearances, and cross-genre collaborations, please reach out directly.
                        </p>
                        <a
                            href="mailto:info@santinoscavelli.de?subject=Booking%20Tambour"
                            className="inline-block px-10 py-4 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-all font-medium text-xs sm:text-sm uppercase tracking-[0.16em] hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Inquire for Booking
                        </a>
                    </div>
                </div>
            }
        />
    );
}
