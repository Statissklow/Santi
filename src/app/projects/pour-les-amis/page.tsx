import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PourLesAmis() {
    return (
        <ProjectPageLayout
            title="Pour les Amis"
            subtitle="Eine Veranstaltungsreihe in Kooperation mit der Stadt Mannheim und der Orientalische Musik Akademie"
            imageSrc="/images/tamburimundi.jpg"
            imageAlt="Pour les Amis Concert"
            videoSrc="https://www.youtube.com/embed/xc_oh5g-C7M"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">...durch Ihre Leidenschaft miteinander kommunizieren..</h3>
                    <p>
                        Wie wäre es denn wenn sich Musiker unterschiedlicher Herkunft, mit völlig unterschiedlichen Backgrounds, treffen und ohne sich zu kennen oder zuvor voneinander gehört zu haben, anfangen würden Musik zu machen?
                        Diesen und anderen Fragen geht das Projekt &quot;Pour les Amis&quot; nach.
                    </p>
                    <p>
                        Die Konzertreihe “Pour les Amis” ist ein Projekt von Santino Scavelli in Kooperation mit der Stadt Mannheim und der “Orientalische Musikakademie Mannheim”.
                    </p>
                    <p>
                        Die Reihe <strong className="text-amber-500">&quot;Pour les Amis&quot;</strong> (Für die Freunde) bringt Musiker aus verschiedenen kulturellen Hintergründen zusammen.
                    </p>
                    <h3 className="text-xl font-bold text-white">Plattform für Musiker</h3>
                    <p>
                        Der Name “Pour les Amis” beschreibt einen Ansatz, der weit über ein professionelles Weltmusik-Meeting hinausgeht. Wir schaffen einen geschützten Raum für Menschen, die sich einander künstlerisch anvertrauen.
                    </p>

                    <div className="bg-white/5 p-6 rounded-lg mt-8">
                        <h4 className="text-lg font-bold text-white mb-4">Einige Künstler die bei uns zu Gast waren:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Ceyda Pirali (TUR)</li>
                            <li>Gregory Dargent (FR)</li>
                            <li>Annette Maye (DE)</li>
                            <li>Arezoo Rezvani (IRN)</li>
                            <li>Max Clouth (DE)</li>
                        </ul>
                    </div>
                </div>
            }
        />
    );
}
