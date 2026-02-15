import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function MonkeyBeatz() {
    return (
        <ProjectPageLayout
            title="Monkey Beatz"
            subtitle="Ein Studio Experiment"
            imageSrc="/images/tobi.jpg"
            imageAlt="Monkey Beatz Studio"
            videoSrc="https://www.youtube.com/embed/oiPEmAeXYCY"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Nur ein Studio Experiment?</h3>
                    <p>
                        Das Projekt Monkey Beatz ist ein Studio-Experiment, das Anfang 2020 begann.
                        Ziel war es, einen Kanal zu erschaffen, bei dem sich andere Musiker und insbesondere Perkussionisten inspiriert fühlen.
                    </p>
                    <p>
                        Zudem war es mir wichtig, ein Format zu erschaffen, wo ich mich als Multiinstrumentalist austoben kann und Freilauf für meine Ideen und Konzepte habe.
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
                        <h4 className="text-lg font-bold text-white mb-2">Kooperationen</h4>
                        <p>
                            Das Interesse von Firmen wie <strong>Meinl Percussion</strong> oder <strong>Zoom</strong> hat das Projekt beflügelt.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-lg font-bold text-white mb-2">Interesse geweckt?</h4>
                        <p>
                            Immer wieder erreichen mich Anfragen für Kooperationen. Falls du Interesse hast, zögere nicht und schreib mir!
                        </p>
                        <a href="mailto:info@santinoscavelli.de" className="inline-block mt-4 px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors">
                            Kontakt aufnehmen
                        </a>
                    </div>
                </div>
            }
        />
    );
}
