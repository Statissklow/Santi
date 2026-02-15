
import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function PourLesAmis() {
    return (
        <ProjectPageLayout
            title="Pour les Amis"
            subtitle="An event series in cooperation with the City of Mannheim and the Oriental Music Academy"
            imageSrc="/images/tamburimundi.jpg"
            imageAlt="Pour les Amis Concert"
            videoSrc="https://www.youtube.com/embed/xc_oh5g-C7M"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">...communicating with each other through their passion..</h3>
                    <p>
                        What would it be like if musicians of different origins, with completely different backgrounds, met and started making music without knowing each other or having heard of each other before?
                        The project &quot;Pour les Amis&quot; investigates these and other questions.
                    </p>
                    <p>
                        The concert series “Pour les Amis” is a project by Santino Scavelli in cooperation with the City of Mannheim and the “Oriental Music Academy Mannheim”.
                    </p>
                    <p>
                        The series <strong className="text-amber-500">&quot;Pour les Amis&quot;</strong> (For Friends) brings together musicians from various cultural backgrounds.
                    </p>
                    <h3 className="text-xl font-bold text-white">Platform for Musicians</h3>
                    <p>
                        The name “Pour les Amis” describes an approach that goes far beyond a professional world music meeting. We create a protected space for people who entrust themselves to one another artistically.
                    </p>

                    <div className="bg-white/5 p-6 rounded-lg mt-8">
                        <h4 className="text-lg font-bold text-white mb-4">Some artists who have been our guests:</h4>
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
