
import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PulseProject() {
    return (
        <ProjectPageLayout
            title="Pulse Project"
            subtitle="Fusion of different cultures and musical styles"
            imageSrc="/images/_DSC1321.jpg"
            imageAlt="Pulse Project Band"
            videoSrc="https://www.youtube.com/embed/zBNyfipOFrU"
            description={
                <div className="space-y-4">
                    <p>
                        In the Pulse Project formation, different cultures and musical styles merge in a fascinating way.
                        The creative minds are Yazan Alsabbagh (clarinet), Hesham Hamra (oud), and Santino Scavelli (drums).
                    </p>
                    <p>
                        Their music can be described as a fusion of Arabic and Western music. They use elements ranging from jazz and rock to reggae.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">The Band</h4>
                            <ul className="list-disc pl-5">
                                <li>Yazan Alsabbagh (Klarinette)</li>
                                <li>Hesham Hamra (Oud)</li>
                                <li>Santino Scavelli (Schlagzeug)</li>
                                <li>Simon Zauels (E-Bass)</li>
                                <li>Andre Haaf (Keyboard)</li>
                                <li>Julius Imhäuser (Gitarre)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Past Locations</h4>
                            <ul className="list-disc pl-5">
                                <li>Elbphilharmonie</li>
                                <li>Fabrik, Hamburg</li>
                                <li>Open Jazz, Stuttgart</li>
                                <li>Alte Feuerwache, Mannheim</li>
                                <li>Planet Ears Festival</li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
