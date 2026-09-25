import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectPageProps {
    title: string;
    subtitle?: string;
    kicker?: string;
    backHref?: string;
    backLabel?: string;
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
    kicker = "Projekt & Ensemble",
    backHref = "/#services",
    backLabel = "← Zurück zur Übersicht",
    description,
    imageSrc,
    imageAlt,
    videoSrc,
    galleryImages,
    links,
}: ProjectPageProps) {
    return (
        <div className="min-h-screen font-sans text-white bg-[#0f0f14] py-28 sm:py-36 px-6">
            <main className="max-w-5xl mx-auto space-y-14 sm:space-y-20">

                {/* Breadcrumb / Back button */}
                <div>
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/50 hover:text-white transition-colors py-2"
                    >
                        {backLabel}
                    </Link>
                </div>

                {/* Header */}
                <section className="text-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e44c65] font-medium block mb-4 sm:mb-6">
                        {kicker}
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.16em] text-white uppercase leading-[1.08] mb-6">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-base sm:text-lg lg:text-xl text-white/70 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </section>

                {/* Main Hero Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content / Description */}
                <div className="space-y-10 text-white/80 font-light leading-relaxed text-base sm:text-lg">
                    {description}

                    {links && links.length > 0 && (
                        <div className="flex flex-wrap gap-4 pt-6 justify-center">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="px-8 py-4 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-all font-medium text-xs sm:text-sm uppercase tracking-[0.16em] hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
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
                    <div className="space-y-6 pt-4">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#e44c65] font-medium block text-center">
                            Video Impression
                        </span>
                        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src={videoSrc}
                                title={`${title} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {/* Gallery */}
                {galleryImages && galleryImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                        {galleryImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Back Button */}
                <div className="text-center pt-8 border-t border-white/5">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                    >
                        {backLabel}
                    </Link>
                </div>

            </main>
        </div>
    );
}
