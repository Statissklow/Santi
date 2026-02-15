import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";

export default function About() {
    return (
        <div className="min-h-screen p-4 sm:p-20 font-[family-name:var(--font-lato)]">
            <main className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <section className="text-center space-y-6 pt-8">
                    <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">About Santino</h1>
                    <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto">
                        Drummer, Percussionist, Composer.
                    </p>
                </section>

                {/* Hero Image (Glass Layout Style) */}
                <section className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <Image
                        src="/images/Meinldrumfestival II.jpg"
                        alt="Santino Scavelli Live"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d26] via-transparent to-transparent opacity-60" />
                </section>

                {/* Main Content Card (Glassmorphism) */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-[#1c1d26]/50 p-6 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                            <h3 className="text-xl font-bold text-white">Press Kit & Rider</h3>
                            <CtaButton
                                href="https://drive.google.com/drive/folders/1owr1J6ocqJBIWBRMau5MmSPJ9KNG-syn?usp=sharing"
                                target="_blank"
                                className="w-full text-center"
                            >
                                Press Access
                            </CtaButton>
                        </div>

                        <div className="bg-[#1c1d26]/50 p-6 rounded-2xl border border-white/10 space-y-4 shadow-lg">
                            <h3 className="text-xl font-bold text-white">Contact</h3>
                            <a href="mailto:info@santinoscavelli.de" className="block text-white/80 hover:text-white transition-colors">info@santinoscavelli.de</a>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:col-span-8 space-y-12 text-lg text-white/80 leading-relaxed">

                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Biography</h2>
                            <p className="mb-4">
                                Santino Scavelli impresses his audience with his <strong className="text-white">high technical level</strong> and his <strong className="text-white">unconventional approach</strong>. His ability to reduce various cultural influences to a common denominator and reproduce them in a new context is <strong className="text-white">pioneering</strong> and groundbreaking for drummers and percussionists of the coming generation.
                            </p>
                            <p>
                                Through his collaboration with international artists and his performances on renowned stages, Santino has developed incomparable expertise. His innovative use of <strong className="text-white">hybrid setups</strong>, combining drums and percussion, allows him to create a wide spectrum of sounds and cross musical boundaries.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Awards & Recognition</h2>
                            <ul className="space-y-4">
                                <li className="bg-white/5 p-4 rounded-xl flex items-center gap-4 border-l-4 border-[#e44c65]">
                                    <span className="text-[#e44c65] font-bold text-xl">2024</span>
                                    <span className="font-bold text-white">UK Drum Show Hauptbühne</span>
                                </li>
                                <li className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                                    <span className="text-[#e44c65] font-bold text-xl">2023</span>
                                    <span className="font-medium text-white">Meinl Outstanding Performance Award</span>
                                </li>
                                <li className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                                    <span className="text-[#e44c65] font-bold text-xl">2019</span>
                                    <span className="font-medium text-white">Youtube Early Career Award</span>
                                </li>
                                <li className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                                    <span className="text-[#e44c65] font-bold text-xl">2018</span>
                                    <span className="font-medium text-white">Framedrum Award</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Vision & Mission</h2>
                            <p>
                                Santino Scavelli&apos;s vision goes beyond the mere fusion of percussion and drums. He strives to usher in a new era where conventional boundaries between different percussion instruments disappear.
                            </p>
                        </section>

                    </div>
                </section>
            </main>
        </div>
    );
}
