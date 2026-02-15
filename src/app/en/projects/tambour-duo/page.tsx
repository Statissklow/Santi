
import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function TambourDuo() {
    return (
        <ProjectPageLayout
            title="Tambour Duo/Quartet"
            subtitle="Born as a duo, now expanding their music with new sounds."
            imageSrc="/images/Tmbour.jpg"
            imageAlt="Tambour Duo"
            videoSrc="https://www.youtube.com/embed/6HTHxZ1uv2M"
            description={
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Identities of the international lineup</h3>
                    <p>
                        The „Tambour Quartet“, born as a duo, is now expanding its music with new sounds.
                        An earthy sound that oscillates between oriental tradition, jazz, and blues and reflects the identities of the international lineup.
                    </p>
                    <p>
                        Sometimes delicate and gentle, sometimes powerful and punchy, a bundle of different styles that are consistently and balancedly mixed together.
                    </p>
                </div>
            }
        />
    );
}
