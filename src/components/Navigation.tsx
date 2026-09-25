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
    {
        name: "Menü",
        href: "#",
        submenu: [
            { name: "Über Santino", href: "/about" },
            { name: "Studio & Recording", href: "/recording" },
            { name: "Unterricht", href: "/lessons" },
            { name: "SYNTHESIS Sample Pack", href: "/sample-packs" },
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
    { name: "Sample Packs", href: "/sample-packs" },
    { name: "Kontakt", href: "/contact", primary: true },
    { name: "Student Portal", href: "/portal", scale: true }
];

const enLinks: NavLink[] = [
    {
        name: "Menu",
        href: "#",
        submenu: [
            { name: "About Santino", href: "/en/about" },
            { name: "Studio & Recording", href: "/en/recording" },
            { name: "Lessons", href: "/en/lessons" },
            { name: "SYNTHESIS Sample Pack", href: "/en/sample-packs" },
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
    { name: "Sample Packs", href: "/en/sample-packs" },
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

    const navItems = navLinks.filter(l => !l.primary && !l.scale);
    const actionItems = navLinks.filter(l => l.primary || l.scale);

    return (
        <header className="fixed top-0 w-full z-50 bg-[#1c1d26]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl supports-[backdrop-filter]:bg-[#1c1d26]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20 sm:h-24">
                    {/* Left: Brand & Language Toggle */}
                    <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                        <Link
                            href={isEnglish ? "/" : "/en"}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-white/5 hover:bg-[#e44c65] rounded-full border border-white/15 transition-all group shadow-[0_0_12px_rgba(0,0,0,0.2)] hover:shadow-[0_0_18px_rgba(228,76,101,0.5)] shrink-0"
                            aria-label="Switch Language"
                        >
                            <Globe size={14} className="text-white/70 group-hover:text-white transition-colors" />
                            <span className="text-xs font-bold text-white tracking-widest">{isEnglish ? "DE" : "EN"}</span>
                        </Link>
                        <div className="text-white font-medium text-base sm:text-lg lg:text-xl tracking-[0.16em] uppercase shrink-0">
                            <Link href={isEnglish ? "/en" : "/"} className="hover:text-[#e44c65] transition-colors">
                                Santino Scavelli
                            </Link>
                        </div>
                    </div>

                    {/* Middle: Menü, Projekte, Sample Packs */}
                    <nav className="hidden lg:flex items-center ml-5 xl:ml-8 gap-4 xl:gap-7 2xl:gap-8 shrink-0">
                        {navItems.map((link) => (
                            <div key={link.name} className="relative group shrink-0">
                                {link.submenu ? (
                                    <div className="relative">
                                        <button
                                            className="text-white/80 hover:text-white py-2 text-xs xl:text-sm font-normal uppercase tracking-[0.12em] xl:tracking-[0.14em] flex items-center gap-1.5 group-hover:text-[#e44c65] focus:outline-none transition-all duration-200 cursor-pointer whitespace-nowrap"
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown size={15} className="opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                                        </button>
                                        {/* Dropdown Menu */}
                                        <div className="absolute left-0 mt-3 w-64 rounded-2xl shadow-2xl py-3 bg-[#1c1d26]/95 backdrop-blur-2xl border border-white/15 ring-1 ring-black/40 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                                            {link.submenu.map((sublink) => (
                                                <div key={sublink.name}>
                                                    <Link
                                                        href={sublink.href}
                                                        className="block px-6 py-3.5 text-sm font-medium tracking-[0.06em] text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
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
                                        className="text-white/80 hover:text-[#e44c65] py-2 text-xs xl:text-sm font-normal uppercase tracking-[0.12em] xl:tracking-[0.14em] transition-all duration-200 whitespace-nowrap"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right: Action Buttons (Kontakt, Student Portal, Admin) with guaranteed separation */}
                    <div className="hidden lg:flex items-center ml-auto pl-8 xl:pl-12 shrink-0">
                        {/* Elegant vertical separator between page links and action buttons */}
                        <div className="h-5 w-px bg-white/20 mr-4 xl:mr-6" />

                        <div className="flex items-center gap-2.5 xl:gap-3.5">
                            {actionItems.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`${link.primary
                                        ? "bg-[#e44c65] text-white shadow-[0_0_20px_rgba(228,76,101,0.4)] hover:shadow-[0_0_30px_rgba(228,76,101,0.7)] hover:bg-[#c43c52]"
                                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-md"
                                        } px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap shrink-0`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile & Tablet Hamburger Button (< lg screens) */}
                    <div className="lg:hidden flex items-center ml-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-200 hover:text-white focus:outline-none p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile & Tablet Drawer (< lg screens) */}
            {isOpen && (
                <div className="lg:hidden bg-[#161720]/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
                    <div className="px-5 pt-4 pb-8 space-y-4">
                        {/* Navigation Items */}
                        <div className="space-y-1">
                            {navItems.map((link) => (
                                <div key={link.name} className="py-1">
                                    {link.submenu ? (
                                        <div className="space-y-1">
                                            <div className="px-3 py-2 text-white/50 font-bold uppercase text-xs tracking-widest">
                                                {link.name}
                                            </div>
                                            <div className="pl-3 border-l-2 border-white/10 ml-2 space-y-1">
                                                {link.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                                                        {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-3 py-2.5 rounded-xl text-base font-medium uppercase tracking-[0.14em] text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Separate Action Buttons */}
                        <div className="pt-4 border-t border-white/10 space-y-2.5">
                            {actionItems.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`w-full block text-center py-3.5 px-6 rounded-2xl font-medium uppercase tracking-[0.14em] text-sm transition-all ${link.primary
                                        ? "bg-[#e44c65] text-white shadow-[0_0_20px_rgba(228,76,101,0.4)] hover:bg-[#c43c52]"
                                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
