import Image from "next/image";

interface ProjectPageProps {
    title: string;
    subtitle?: string;
    description: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    videoSrc?: string;
    galleryImages?: { src: string; alt: string }[];
    links?: { label: string; href: string }[];
}

export function ProjectPageLayout({
    title,
    subtitle,
    description,
    imageSrc,
    imageAlt,
    videoSrc,
    galleryImages,
    links,
}: ProjectPageProps) {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-roboto)]">
            <main className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">{title}</h1>
                    {subtitle && <p className="text-xl text-white/60">{subtitle}</p>}
                </section>

                <div className="space-y-8">
                    {/* Main Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Description & Links */}
                    <div className="prose prose-invert max-w-none text-white/80">
                        {description}

                        {links && links.length > 0 && (
                            <div className="flex gap-4 mt-6 not-prose">
                                {links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="px-6 py-2 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-colors font-medium no-underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Video Embed */}
                    {videoSrc && (
                        <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
                            <iframe
                                width="100%"
                                height="100%"
                                src={videoSrc}
                                title={`${title} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {/* Gallery */}
                    {galleryImages && galleryImages.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
