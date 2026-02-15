
import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function MonkeyBeatz() {
    return (
        <ProjectPageLayout
            title="Monkey Beatz"
            subtitle="A Studio Experiment"
            imageSrc="/images/tobi.jpg"
            imageAlt="Monkey Beatz Studio"
            videoSrc="https://www.youtube.com/embed/oiPEmAeXYCY"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Just a Studio Experiment?</h3>
                    <p>
                        The Monkey Beatz project is a studio experiment that began in early 2020.
                        The goal was to create a channel where other musicians, especially percussionists, feel inspired.
                    </p>
                    <p>
                        It was also important to me to create a format where I can let off steam as a multi-instrumentalist and give free rein to my ideas and concepts.
                    </p>

                    {/* Additional Video from Recording Page */}
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-lg mt-8">
                        <iframe
                            width="100%" height="100%"
                            src="https://www.youtube.com/embed/UXlT_bLah-o"
                            title="Recording Demo 1"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="bg-white/5 p-6 rounded-lg mt-8 border border-[#e44c65]">
                        <h4 className="text-lg font-bold text-white mb-2">Collaborations</h4>
                        <p>
                            The interest of companies like <strong>Meinl Percussion</strong> or <strong>Zoom</strong> has given wings to the project.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-lg font-bold text-white mb-2">Interested?</h4>
                        <p>
                            I frequently receive requests for collaborations. If you are interested, don&apos;t hesitate and write to me!
                        </p>
                        <a href="mailto:info@santinoscavelli.de" className="inline-block mt-4 px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors">
                            Contact Me
                        </a>
                    </div>
                </div>
            }
        />
    );
}
