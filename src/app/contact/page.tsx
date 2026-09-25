"use client";

import Image from "next/image";
import { Mail, Music, GraduationCap, Calendar, Instagram, Facebook, Youtube, Linkedin, ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { CtaButton } from "@/components/CtaButton";

export default function Contact() {
    const contactOptions = [
        {
            icon: Calendar,
            title: "Booking & Events",
            desc: "Live Drums, Studio Sessions, Events",
            action: "booking@santinoscavelli.de",
            cta: "Send Inquiry",
            delay: 0.2
        },
        {
            icon: GraduationCap,
            title: "Lessons & Education",
            desc: "Private Lessons, Workshops, Masterclasses",
            action: "lessons@santinoscavelli.de",
            cta: "Book Session",
            delay: 0.3
        },
        {
            icon: Mail,
            title: "Management & General",
            desc: "Press, Interviews, Collaborations",
            action: "info@santinoscavelli.de",
            cta: "Get in Touch",
            delay: 0.4
        }
    ];

    const socialLinks = [
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
        { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    ];

    return (
        <main className="min-h-screen bg-[#1c1d26] text-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/drumset-iii.jpg"
                        alt="Contact Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d26]/30 via-[#1c1d26]/60 to-[#1c1d26]" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <FadeIn>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-2xl">
                            Contact
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                            Let&apos;s create something together
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Hub Section */}
            <section className="container mx-auto px-4 py-20 -mt-20 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {contactOptions.map((option, index) => (
                        <FadeIn key={index} delay={option.delay}>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e44c65]/20 flex flex-col items-center text-center h-full">
                                <div className="w-16 h-16 bg-[#e44c65]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#e44c65]">
                                    <option.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                                <p className="text-gray-400 mb-8 flex-grow">{option.desc}</p>
                                <CtaButton href={`mailto:${option.action}`}>
                                    {option.cta}
                                </CtaButton>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Social Media Section */}
            <section className="py-20 bg-[#1c1d26]">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.5}>
                        <h2 className="text-3xl font-bold mb-12">Follow Me</h2>
                        <div className="flex justify-center gap-8 md:gap-16">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-3 text-gray-400 hover:text-[#e44c65] transition-colors"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#e44c65] transition-colors duration-300 bg-white/5 group-hover:bg-[#e44c65]/10">
                                        <social.icon size={24} className="md:w-8 md:h-8" />
                                    </div>
                                    <span className="text-sm font-medium tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Footer Info */}
            <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>Based in Mannheim, Germany</p>
                <p>&copy; {new Date().getFullYear()} Santino Scavelli. All rights reserved.</p>
            </footer>
        </main>
    );
}
