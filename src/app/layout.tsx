import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist, Geist_Mono, Lato } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import SessionProvider from "@/components/SessionProvider";
import Link from "next/link";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santino Scavelli - Rhythm, Innovation, Tradition",
  description: "Musician, Educator, and Producer.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} ${lato.variable} antialiased bg-[#1c1d26] text-white/80 font-[family-name:var(--font-plus-jakarta)]`}
      >
        <SessionProvider>
          <div className="bg-noise" />
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
          {/* Footer */}
          <footer className="bg-[#0d0d12] border-t border-white/5 py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-sm">
                © {new Date().getFullYear()} Santino Scavelli. Alle Rechte vorbehalten.
              </p>
              <div className="flex gap-6 text-sm text-white/30">
                <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
                <Link href="/bildnachweis" className="hover:text-white transition-colors">Bildnachweis</Link>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
