import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PulseProject() {
    return (
        <ProjectPageLayout
            title="Pulse Project"
            subtitle="Verschmelzung verschiedener Kulturen und Musikstile"
            imageSrc="/images/_DSC1321.jpg"
            imageAlt="Pulse Project Band"
            videoSrc="https://www.youtube.com/embed/zBNyfipOFrU"
            description={
                <div className="space-y-4">
                    <p>
                        Bei der Formation Pulse Project verschmelzen verschiedene Kulturen und Musikstile auf eine faszinierende Art und Weise.
                        Die kreativen Köpfe sind Yazan Alsabbagh (Klarinette), Hesham Hamra (Oud) und Santino Scavelli (Schlagzeug).
                    </p>
                    <p>
                        Ihre Musik lässt sich als eine Fusion von arabischer und westlicher Musik bezeichnen. Dabei bedienen sie sich Elementen von Jazz, Rock bis hin zu Reggae.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Die Band</h4>
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
                            <h4 className="text-lg font-bold text-white mb-2">Gespielte Locations</h4>
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
