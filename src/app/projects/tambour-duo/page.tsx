import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function TambourDuo() {
    return (
        <ProjectPageLayout
            title="Tambour Duo/Quartett"
            subtitle="Als Duo geboren, erweitert nun ihre Musik um neue Klänge."
            imageSrc="/images/Tmbour.jpg"
            imageAlt="Tambour Duo"
            videoSrc="https://www.youtube.com/embed/6HTHxZ1uv2M"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Identitäten der internationalen Besetzung</h3>
                    <p>
                        Das „Tambour Quartett“, als Duo geboren, erweitert nun ihre Musik um neue Klänge.
                        Ein erdiger Sound der zwischen orientalischer Tradition, Jazz und Blues hin und herpendelt und die Identitäten der internationalen Besetzung widerspiegelt.
                    </p>
                    <p>
                        Mal zart und sanft mal kräftig und druckvoll, ein Bündel aus unterschiedlichen Stilrichtungen die konsequent und ausgewogen miteinander vermischt werden.
                    </p>
                </div>
            }
        />
    );
}
