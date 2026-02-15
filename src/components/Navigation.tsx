"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

type NavLink = {
    name: string;
    href: string;
    primary?: boolean;
    scale?: boolean;
    submenu?: {
        name: string;
        href: string;
        external?: boolean;
    }[];
    external?: boolean;
};

const deLinks: NavLink[] = [
    { name: "Home", href: "/" },
    {
        name: "Menü",
        href: "#",
        submenu: [
            { name: "Über Santino", href: "/about" },
            { name: "Studio & Recording", href: "/recording" },
            { name: "Unterricht", href: "/lessons" },
            { name: "Studio mieten", href: "https://drumhub.de", external: true },
        ]
    },
    {
        name: "Projekte",
        href: "#",
        submenu: [
            { name: "Pour les Amis", href: "/projects/pour-les-amis" },
            { name: "Pulse Project", href: "/projects/pulse-project" },
            { name: "Tambour Duo", href: "/projects/tambour-duo" },
            { name: "Monkey Beatz", href: "/projects/monkey-beatz" },
            { name: "Nevell", href: "https://www.anikanilles.com/nevell_rd_2024/", external: true },
        ]
    },
    { name: "Kontakt", href: "/contact", primary: true },
    { name: "Student Portal", href: "/portal", scale: true }
];

const enLinks: NavLink[] = [
    { name: "Home", href: "/en" },
    {
        name: "Menu",
        href: "#",
        submenu: [
            { name: "About Santino", href: "/en/about" },
            { name: "Studio & Recording", href: "/en/recording" },
            { name: "Lessons", href: "/en/lessons" },
            { name: "Rent Studio", href: "https://drumhub.de", external: true },
        ]
    },
    {
        name: "Projects",
        href: "#",
        submenu: [
            { name: "Pour les Amis", href: "/en/projects/pour-les-amis" },
            { name: "Pulse Project", href: "/en/projects/pulse-project" },
            { name: "Tambour Duo", href: "/en/projects/tambour-duo" },
            { name: "Monkey Beatz", href: "/en/projects/monkey-beatz" },
            { name: "Nevell", href: "https://www.anikanilles.com/nevell_rd_2024/", external: true },
        ]
    },
    { name: "Contact", href: "/en/contact", primary: true },
    { name: "Student Portal", href: "/portal", scale: true }
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const isEnglish = pathname?.startsWith("/en");
    const activeLinks = isEnglish ? enLinks : deLinks;

    const navLinks = session?.user?.role === "ADMIN"
        ? [...activeLinks, { name: "Admin Dashboard", href: "/admin", scale: true, primary: false }]
        : activeLinks;

    return (
        <header className="fixed top-0 w-full z-50 bg-[#1c1d26]/80 backdrop-blur-md border-b border-white/5 shadow-lg supports-[backdrop-filter]:bg-[#1c1d26]/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20"> {/* Increased height slightly for premium feel */}
                    <div className="flex items-center gap-6">
                        <Link
                            href={isEnglish ? "/" : "/en"}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-[#e44c65] rounded-full border border-white/10 transition-all group shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(228,76,101,0.4)]"
                        >
                            <Globe size={14} className="text-white/60 group-hover:text-white transition-colors" />
                            <span className="text-xs font-bold text-white tracking-widest">{isEnglish ? "DE" : "EN"}</span>
                        </Link>
                        <div className="flex-shrink-0 text-white font-bold text-2xl tracking-tighter">
                            <Link href={isEnglish ? "/en" : "/"}>Santino Scavelli</Link>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    {link.submenu ? (
                                        <div className="relative">
                                            <button
                                                className={`text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 group-hover:text-white focus:outline-none transition-colors tracking-wide ${link.scale ? 'text-[#e44c65] font-bold' : ''}`}
                                            >
                                                {link.name} <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                            {/* Dropdown Menu */}
                                            <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl py-2 bg-[#1c1d26]/95 backdrop-blur-xl border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                                                {link.submenu.map((sublink) => (
                                                    <div key={sublink.name} className="relative group/nested">
                                                        <Link
                                                            href={sublink.href}
                                                            className={`block px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors`}
                                                            {...(sublink.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`${link.primary
                                                ? "bg-[#e44c65] text-white shadow-[0_0_15px_rgba(228,76,101,0.3)] hover:shadow-[0_0_25px_rgba(228,76,101,0.6)] hover:bg-[#c43c52]"
                                                : link.scale
                                                    ? "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                                                    : "text-white/80 hover:text-white hover:bg-white/5"
                                                } px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 tracking-wide`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#1c1d26]/95 backdrop-blur-xl border-t border-white/10">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.submenu ? (
                                    <>
                                        <div className="px-3 py-2 text-white/50 font-bold uppercase text-xs tracking-widest mt-2">{link.name}</div>
                                        <div className="pl-2 border-l border-white/10 ml-2 space-y-1">
                                            {link.submenu.map(sub => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block pl-4 pr-3 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                                    {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${link.primary ? 'bg-[#e44c65]/20 text-[#e44c65]' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
